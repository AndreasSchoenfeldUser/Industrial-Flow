# IndustrialFlow

CI/CD-Plattform für Industrial DevOps. Jenkins-Kern, moderne UI, KI-Assistent (Claude oder lokal Ollama), OT-native Architektur. Dieses Repository wächst in sechs Phasen vom klickbaren Frontend-Mockup zur vollständigen, air-gap-fähigen Plattform.

Quelle für Architektur und Begriffe: Blog-Artikel `https://comquent.de/ressourcen/blog/industrialflow-cicd-plattform-industrial-devops`.

---

## Aktuelle Phase

**Phase 1 — GUI-Mockup mit Mock-Daten.** Kein echter Backend-Aufruf, kein Jenkins, keine KI-API. Ziel: Stakeholder können sich durch alle wesentlichen Screens klicken und das Bedienkonzept validieren. Wenn etwas in Phase 1 noch nicht funktioniert, ist das in Ordnung — sofern es im Datenmodell und in den UI-Komponenten so vorgesehen ist, dass eine spätere Phase es füllen kann.

Was Claude Code in Phase 1 nicht selbst tun soll: Jenkins installieren, Docker-Compose-Files für das Backend schreiben, Anthropic-API-Calls implementieren, OPC-UA-Bibliotheken einbinden, OT-Proxy-Agents bauen. Alles davon ist in späteren Phasen verortet.

---

## Phasen-Plan

### Phase 1 — GUI-Mockup
Next.js-Frontend mit drei Hauptansichten (Dashboard, Pipeline-Detail, Werker-Mobile) und zugehörigen Nebenansichten. Alle Daten aus `packages/mock-data`. Vollständig durchklickbar, optisch produktionsnah.

### Phase 2 — Jenkins-Backend-Integration
Jenkins LTS in Docker Compose. JCasC für reproduzierbare Konfiguration. Backend-for-Frontend (BFF) in Node.js, das Jenkins-API in saubere REST-Endpunkte für das UI übersetzt. Mock-Provider werden durch BFF-Provider ersetzt — die UI-Schnittstelle bleibt stabil. Installation und Konfiguration des Jenkins ist expliziter Bestandteil dieser Phase, inklusive Plugin-Liste, RBAC und Audit-Log.

### Phase 3 — KI-Assistent
Anthropic Claude API für den Online-Modus, Ollama-HTTP-API für den Air-Gap-Modus. Build-Failure-Analyse, Pipeline-Generator, Risk-Scoring. Log-Scrubbing vor jedem API-Call.

### Phase 4 — OT-Layer
OT-Proxy-Agent als Go-Binary. OPC-UA-Bridge für SPS-Zugriff. Wartungsfenster und Produktionssicherheits-Lock auf Pipeline-Ebene konfigurierbar.

### Phase 5 — DevSecOps & Compliance
SBOM-Generierung pro Build (CycloneDX + SPDX, signiert). Trivy- und Semgrep-Integration. Unveränderlicher Audit-Log. Auto-generierte Reports für IEC 62443, NIS2, TISAX-Vorbereitung.

### Phase 6 — Multi-Site & Air-Gap
Privater Container-Registry-Mirror, lokaler Plugin-Mirror, Multi-Site-Controller für mehrere Werke unter einer Plattform-Instanz. Vollständig offline lauffähige Installation.

---

## Tech-Stack

### Phase 1
- Next.js 15 mit App Router
- TypeScript im strict mode
- Tailwind CSS v4
- shadcn/ui für Basis-Komponenten
- lucide-react für Icons
- Recharts für Diagramme im Compliance-View
- Vitest und React Testing Library
- pnpm als Paketmanager
- Docker (Multi-Stage, Next.js standalone) und Caddy als TLS-Reverse-Proxy für das VM-Deployment
- GitHub Actions als CI/CD, GitHub Container Registry als Image-Registry

### Phase 2
- Jenkins LTS (jdk21)
- Docker Compose
- JCasC (Jenkins Configuration as Code)
- Node.js 22 LTS für den BFF, Fastify als HTTP-Framework
- Postgres für Audit-Log und Pipeline-Metadaten

### Phase 3
- `@anthropic-ai/sdk`
- Ollama HTTP-API (lokal)

### Phase 4
- Go 1.23 für den OT-Proxy-Agent
- `node-opcua` im BFF für OPC-UA-Anbindung

### Phase 5
- `@cyclonedx/cdxgen` für SBOM
- Trivy CLI, Semgrep CLI
- OPA/Rego für Policy-as-Code

### Phase 6
- Harbor oder Sonatype Nexus als Container-Registry-Mirror

---

## Projektstruktur

```
industrialflow/
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD: Quality-Gate → Image → SSH-Deploy (Phase 1+)
├── apps/
│   ├── web/                  # Next.js-Frontend (Phase 1+)
│   └── bff/                  # Backend-for-Frontend (Phase 2+)
├── packages/
│   ├── ui/                   # Geteilte UI-Komponenten
│   ├── types/                # TypeScript-Typen (Pipeline, Machine, Stage, ...)
│   └── mock-data/            # Mock-Daten und Mock-Provider (Phase 1)
├── services/
│   ├── ot-proxy/             # OT-Proxy-Agent in Go (Phase 4+)
│   └── opcua-bridge/         # OPC-UA-Bridge (Phase 4+)
├── infra/
│   ├── docker-compose.prod.yml  # VM-Stack: web + Caddy (Phase 1+)
│   ├── docker-compose.yml       # Jenkins + BFF + UI (Phase 2+)
│   ├── caddy/Caddyfile          # TLS + Let's Encrypt (Phase 1+)
│   ├── jcasc/                   # Jenkins Configuration as Code (Phase 2+)
│   └── policies/                # OPA-Rego-Policies (Phase 5+)
├── docs/
│   ├── architektur.md
│   └── compliance.md
├── Dockerfile                # Multi-Stage Build der Next.js-App (Phase 1+)
├── .dockerignore
└── CLAUDE.md
```

pnpm-Workspace mit `apps/*`, `packages/*`, `services/*` als Member. Auch wenn in Phase 1 nur `apps/web`, `packages/types` und `packages/mock-data` befüllt sind, soll die Struktur von Anfang an stehen.

---

## Konventionen

### Code
- TypeScript strict, kein `any` (stattdessen `unknown` mit Type Guards)
- Funktionale React-Komponenten, keine Class-Components
- Server Components als Default im App Router, Client Components nur wo nötig (`"use client"` mit Begründung in Kommentar oben)
- Tailwind für Layout, keine separaten CSS-Module
- Imports: absolute Pfade über `@/`-Alias innerhalb von `apps/web`, Workspace-Imports über `@industrialflow/*`

### Naming
- Komponenten: PascalCase (`PipelineCard.tsx`)
- Utilities: camelCase (`formatDuration.ts`)
- Typen: PascalCase mit klarem Suffix (`Pipeline`, `MachineState`, `RunStatus`)
- Routen: kebab-case (`/pipelines/firmware-cnc-mills`)

### Sprache
- UI-Texte: Deutsch, Sie-Form, sachlich
- Code, Variablennamen, JSDoc, Commit-Messages: Englisch
- Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`)

### Git
- `main` ist immer deploybar
- Feature-Branches: `feat/<thema>`, `fix/<thema>`, `chore/<thema>`
- Squash-Merge in `main`, lineare Historie

---

## Phase 1 — Detailspezifikation

### Routen und Views

1. `/dashboard` — Werks-Übersicht
   - Top-Bar mit Werk-Selector und Air-Gap-Indikator
   - Vier Kennzahlen-Karten: aktive Pipelines, OT-Proxy-Status, IEC-62443-Status, aktives Wartungsfenster
   - Pipeline-Liste mit den Zuständen `running`, `success`, `failed`, `waiting-maintenance`, `production-locked`
   - KI-Assistent-Panel rechts mit Beispiel-Konversation und vorgeschlagenen Aktionen
   - Compliance-Footer mit SBOM-Format, Audit-Eintragszahl, RBAC-Hinweis

2. `/pipelines` — Pipeline-Liste
   - Filterbar nach Status, Werk, Target-Typ
   - Sortierbar nach letztem Lauf

3. `/pipelines/[id]` — Pipeline-Detail eines konkreten Laufs
   - Header mit Pipeline-Name, Run-Nummer, Branch, Commit, Trigger, Startzeit
   - Stage-Flow getrennt nach IT-Phase (5 Stages) und OT-Phase (5 Stages)
   - Deployment-Matrix mit Blue-Green-Status pro Maschine
   - OPC-UA-Pre-Check-Log als Monospace-Block

4. `/compliance` — Compliance-Übersicht
   - Reports nach Standard (IEC 62443, NIS2, TISAX-Vorbereitung, Cyber Resilience Act)
   - Listendarstellung der letzten generierten Reports mit Download-Button

5. `/audit` — Audit-Log
   - Tabellarische Ansicht der letzten Pipeline-Aktionen
   - Filter nach User, Pipeline, Zeitraum

6. `/m` — Mobile Werker-Ansicht (responsive, Single-Column-Layout ab Viewport < 480px)
   - Freigabe-Karte für ausstehende Deployments
   - Liste „Meine Maschinen" mit Status
   - Wartungsfenster-Countdown

7. `/login` — einfacher Mock-Login (Default-User „andreas")

### Datenmodell

Alle Typen liegen in `packages/types/src/`. Beispiele:

```typescript
export type RunStatus =
  | 'queued'
  | 'running'
  | 'success'
  | 'failed'
  | 'waiting-maintenance'
  | 'production-locked';

export type StagePhase = 'it' | 'ot';

export type Stage = {
  name: string;
  phase: StagePhase;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  durationMs?: number;
  startedAt?: string;
};

export type MachineTarget = {
  id: string;                 // CNC-01, PLC-7, HMI-3
  type: 'cnc' | 'plc' | 'hmi' | 'edge' | 'robot';
  hall: string;               // "Werk Sindelfingen / Halle 4"
  status:
    | 'idle'
    | 'running-production'
    | 'updating'
    | 'updated'
    | 'pending'
    | 'locked';
  currentVersion: string;
  targetVersion?: string;
  progress?: number;          // 0..100 nur während updating
  opcua?: OpcUaSnapshot;
};

export type OpcUaSnapshot = {
  machineState: 'idle' | 'running' | 'fault';
  spindleRpm: number;
  safetyDoor: 'open' | 'closed';
  lastJobEndedAt?: string;
};

export type Pipeline = {
  id: string;
  name: string;
  runNumber: number;
  branch: string;
  commit: string;
  triggeredBy: string;
  startedAt: string;
  status: RunStatus;
  stages: Stage[];
  targets: MachineTarget[];
};
```

### Mock-Provider

`packages/mock-data/src/providers.ts` exportiert eine Schnittstelle, die in Phase 2 1:1 vom BFF-Provider implementiert wird:

```typescript
export interface PipelineProvider {
  list(): Promise<Pipeline[]>;
  get(id: string): Promise<Pipeline | null>;
  streamRun(id: string): AsyncIterable<Pipeline>; // Live-Updates
}
```

Das Frontend importiert ausschließlich gegen diese Schnittstelle, niemals direkt gegen Mock-Daten.

### Befehle

```bash
pnpm install                  # Dependencies (Workspace)
pnpm dev                      # Next.js Dev-Server auf Port 3000
pnpm build                    # Production-Build
pnpm lint                     # ESLint
pnpm typecheck                # tsc --noEmit über alle Packages
pnpm test                     # Vitest
pnpm test --watch
```

### Out-of-Scope für Phase 1

- Reale Jenkins-Verbindung
- Authentifizierung (ein hartcodierter Default-User)
- Persistenz (alles aus dem Speicher)
- Echte KI-API
- Internationalisierung (Deutsch only)
- Push-Benachrichtigungen
- WebSocket-Live-Updates (Polling reicht; Streaming kommt in Phase 2)

---

## Phase 2 — Jenkins-Backend-Integration

### Ziel

Frontend ruft echte Daten aus einem Jenkins-Container ab. Mock-Provider in `packages/mock-data` werden durch BFF-Aufrufe ersetzt — die UI-Schnittstelle bleibt unverändert.

### Setup-Skizze

```yaml
# infra/docker-compose.yml
services:
  jenkins:
    image: jenkins/jenkins:lts-jdk21
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
      - ./jcasc:/var/jenkins_config:ro
    environment:
      CASC_JENKINS_CONFIG: /var/jenkins_config

  bff:
    build: ../apps/bff
    ports: ["3001:3001"]
    environment:
      JENKINS_URL: http://jenkins:8080
      JENKINS_USER: ${JENKINS_USER}
      JENKINS_TOKEN: ${JENKINS_TOKEN}
      DATABASE_URL: postgres://industrialflow:industrialflow@db:5432/industrialflow
    depends_on: [jenkins, db]

  web:
    build: ../apps/web
    ports: ["3000:3000"]
    environment:
      BFF_URL: http://bff:3001
    depends_on: [bff]

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: industrialflow
      POSTGRES_PASSWORD: industrialflow
      POSTGRES_DB: industrialflow
    volumes:
      - pg_data:/var/lib/postgresql/data

volumes:
  jenkins_home:
  pg_data:
```

### JCasC-Pflichtinhalte

- Admin-User aus Environment-Variablen
- Plugin-Liste: `pipeline-model-definition`, `git`, `workflow-aggregator`, `configuration-as-code`, `audit-trail`, `role-strategy`, `jenkins-mcp` (sobald veröffentlicht)
- Zwei Rollen: `it-devops` (vollständig), `ot-readonly` (Lesezugriff plus Alerts)
- Audit-Log auf einen separaten Volume-Pfad

### BFF-Aufgaben

- Jenkins-Auth mit API-Token aus Env
- Endpunkte: `GET /pipelines`, `GET /pipelines/:id`, `GET /pipelines/:id/runs`, `GET /pipelines/:id/runs/:n`, `GET /pipelines/:id/runs/:n/log` (SSE)
- Übersetzung Jenkins-XML/JSON → IndustrialFlow-Typen aus `packages/types`
- Postgres-Tabellen: `pipeline_meta`, `audit_log`, `maintenance_window`

### Migration

Beim Start von Phase 2 bleibt `packages/mock-data` erhalten — der BFF-Provider liegt in `apps/bff` und wird über eine Env-Variable im Frontend ausgewählt:

```typescript
const provider =
  process.env.NEXT_PUBLIC_DATA_SOURCE === 'mock'
    ? new MockPipelineProvider()
    : new BffPipelineProvider(process.env.NEXT_PUBLIC_BFF_URL!);
```

So bleibt der Mockup-Modus auch in Phase 2+ als Demo-Modus verfügbar.

---

## Phase 3 — KI-Assistent

- Modus-Schalter pro Workspace: `online` (Anthropic API) oder `airgap` (Ollama)
- Endpunkt im BFF: `POST /ai/analyze-failure`, `POST /ai/generate-pipeline`, `POST /ai/risk-score`
- Log-Scrubbing-Pipeline vor jedem Online-Call: Hostnamen, IP-Adressen, Personennamen, interne IDs entfernen
- Im Air-Gap-Modus: Ollama auf separatem GPU-Host, Modell aus `OLLAMA_MODEL` Env (Default `llama3.1:8b-instruct`)
- DSGVO-Hinweis im UI: Modus, gewähltes Modell, ob Daten den Werks-Perimeter verlassen

---

## Phase 4 — OT-Layer

- OT-Proxy-Agent als statisch gelinktes Go-Binary, läuft auf einem industriellen Edge-PC pro Werk
- mTLS zwischen BFF und Agent, Zertifikate aus interner CA
- Agent-Aufgaben: OPC-UA-Status-Abfrage vor Deployment, Datei-Transfer in OT-Zone, Maschinen-Status-Polling für Dashboard
- Wartungsfenster-Konfiguration als YAML pro Pipeline:

```yaml
maintenance_window:
  timezone: Europe/Berlin
  weekly:
    - day: tue
      from: "02:00"
      to: "04:00"
production_lock:
  pre_deploy_checks:
    - opcua: machineState == 'idle'
    - opcua: spindleRpm == 0
    - opcua: safetyDoor == 'closed'
```

---

## Phase 5 — DevSecOps & Compliance

- SBOM pro Build via `cdxgen`, signiert mit `cosign`
- Trivy- und Semgrep-Stages als Default in jeder Pipeline
- VEX-Annotations für CVEs, um exploit-relevante von theoretischen zu unterscheiden
- Audit-Log unveränderlich (Append-only-Tabelle, Postgres-Trigger blockiert UPDATE/DELETE)
- Report-Generator für IEC 62443 und NIS2: PDF aus Templates plus Roh-JSON

---

## Phase 6 — Multi-Site & Air-Gap

- Container-Registry-Mirror (Harbor) im Werk
- Plugin-Mirror für Jenkins-Updates ohne Internetzugang
- Multi-Site-Controller: zentrale IndustrialFlow-Instanz steuert mehrere Werke, jedes Werk hat seinen eigenen OT-Proxy-Agent und eigene Wartungsfenster
- Komplette Offline-Installation per `docker compose up -d` aus einem zuvor heruntergeladenen Image-Tarball

---

## Deployment

Die Plattform läuft auf einer VM hinter Caddy mit automatischem Let's Encrypt. Domain für die öffentliche Phase-1-Demo: `industrial-flow.comquent.academy`. Der Stack ist von Anfang an Container-basiert, damit Phase 2 ihn nahtlos um Jenkins, BFF und Postgres erweitern kann.

### VM-Voraussetzungen

- Ubuntu 24.04 LTS oder Debian 12
- Docker Engine ≥ 24, Docker Compose Plugin ≥ 2.20
- Phase 1: 2 vCPU, 2 GB RAM, 20 GB SSD. Phase 2 mit Jenkins/Postgres: 4 vCPU, 8 GB RAM, 80 GB SSD
- Ports 80 und 443 öffentlich erreichbar — Port 80 zwingend für die HTTP-01-Challenge von Let's Encrypt
- DNS-A-Record `industrial-flow.comquent.academy` muss vor dem ersten Deploy aktiv sein
- Deploy-User in der `docker`-Gruppe, Arbeitsverzeichnis `/opt/industrial-flow/`, kein root-Login

Einmalige Bootstrap-Befehle auf der VM:

```bash
sudo apt update && sudo apt install -y docker.io docker-compose-plugin
sudo usermod -aG docker $USER && newgrp docker
sudo mkdir -p /opt/industrial-flow && sudo chown $USER:$USER /opt/industrial-flow
```

### Stack auf der VM

- `infra/docker-compose.prod.yml` definiert zwei Services: `web` (Next.js standalone aus dem Repo-`Dockerfile`) und `caddy` (Reverse-Proxy)
- `infra/caddy/Caddyfile` terminiert TLS, setzt HSTS und proxyt nach `web:3000`
- Caddy persistiert Zertifikate im benannten Volume `caddy_data` — dieses Volume nie löschen, sonst Rate-Limit von Let's Encrypt (5 Certs / 7 Tage)

### Image-Registry

- GitHub Container Registry: `ghcr.io/<owner>/<repo>`
- Tags: `sha-<short>` für jeden Commit, zusätzlich `latest` auf `main`
- Bei privatem Repo: PAT mit Scope `read:packages` als Secret `GHCR_PAT` setzen und im Workflow den Login-Block einkommentieren

### CI/CD-Pipeline (`.github/workflows/deploy.yml`)

1. **quality** — `pnpm install --frozen-lockfile`, dann `pnpm typecheck` und `pnpm test`. Quality-Gate vor jedem Deploy.
2. **build-push** — Multi-stage Docker-Build mit BuildKit-Cache (GHA), Push zu GHCR.
3. **deploy** — SCP der Compose-Dateien nach `/opt/industrial-flow/`, SSH rendert `.env` aus Secrets und führt `docker compose pull && up -d` aus.
4. **smoke-test** — Polling von `https://industrial-flow.comquent.academy/dashboard`, bis 200 zurückkommt. Erste Cert-Ausstellung dauert beim ersten Run typischerweise 10–30 s.

### GitHub-Secrets

| Secret | Inhalt |
|---|---|
| `SSH_HOST` | `industrial-flow.comquent.academy` oder VM-IP |
| `SSH_USER` | Deploy-User auf der VM |
| `SSH_PRIVATE_KEY` | PEM-Key, dessen Public-Pendant in `~/.ssh/authorized_keys` liegt |
| `SSH_PORT` | optional, Standard 22 |
| `ACME_EMAIL` | E-Mail für Let's Encrypt-Benachrichtigungen |
| `GHCR_PAT` | nur bei privatem Repo, Scope `read:packages` |

Phase 2 erweitert `infra/docker-compose.prod.yml` um Jenkins, BFF und Postgres im selben internen Docker-Netz; Caddy bleibt der einzige TLS-Termination-Punkt und proxyt zusätzlich auf den BFF.

---

## Wichtige Constraints

### Aus dem Architektur-Versprechen (nicht verhandelbar)
- Jenkins ist Kern, nicht Ersatz. Bestehende Jenkinsfiles laufen ohne Änderung. Es gibt keine plattform-eigene Pipeline-Sprache, die Jenkinsfile ersetzt.
- Air-Gap-Fähigkeit ist Default. Jede Komponente muss ohne Internet funktionieren. Externe Aufrufe zur Laufzeit nur, wenn explizit aktiviert (KI-Online-Modus).
- Compliance ist eingebaut, nicht aufgesetzt. Auch wenn die SBOM-Generierung erst Phase 5 ist, muss das Datenmodell ab Phase 1 die Felder dafür haben.
- UI-Sprache Deutsch, Code-Sprache Englisch. Keine Mischformen.

### Daten und Sicherheit
- Keine Secrets im Code, kein `.env` einchecken
- Jenkins-Token nur im BFF, nie an den Browser geben
- KI-Logs werden vor Übertragung gescrubbt
- Mock-Daten enthalten keine echten Personennamen außer dem Default-User „andreas" und keine echten Maschinen-Seriennummern

### Was Claude Code in Phase 1 nicht tun soll
- Kein `docker-compose.yml` für Jenkins schreiben
- Keine echten Anthropic-API-Calls implementieren
- Keine OPC-UA-Bibliothek einbinden
- Kein Go-Code für den OT-Proxy
- Keine Postgres-Schemas

Wenn etwas davon „nebenbei" sinnvoll erscheint, bitte als TODO-Kommentar mit Phasenangabe markieren und nicht implementieren.

---

## Referenzen

- Quell-Artikel: `https://comquent.de/ressourcen/blog/industrialflow-cicd-plattform-industrial-devops`
- IEC 62443: Network Segmentation in Zones and Conduits
- NIS2-Richtlinie, BSI-Registrierungsfrist 6.3.2026
- EU Cyber Resilience Act, SBOM-Pflicht ab 11.9.2026
- Anthropic Model Context Protocol: `https://modelcontextprotocol.io`
- Jenkins Configuration as Code Plugin
- Comquent-Designsystem für UI-Anmutung (intern)
