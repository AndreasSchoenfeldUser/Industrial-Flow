# syntax=docker/dockerfile:1.7
# Multi-stage build for the Next.js standalone output.

FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.33.3 --activate
WORKDIR /app
ENV CI=1

FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json .npmrc ./
COPY apps/web/package.json ./apps/web/
COPY packages/types/package.json ./packages/types/
COPY packages/mock-data/package.json ./packages/mock-data/
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages/types/node_modules ./packages/types/node_modules
COPY --from=deps /app/packages/mock-data/node_modules ./packages/mock-data/node_modules
COPY tsconfig.base.json ./
COPY packages/types ./packages/types
COPY packages/mock-data ./packages/mock-data
COPY apps/web ./apps/web
RUN pnpm --filter @industrialflow/web build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
# Standalone bundle ships its own minimal node_modules.
COPY --from=builder --chown=nextjs:nextjs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/apps/web/.next/static ./apps/web/.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
