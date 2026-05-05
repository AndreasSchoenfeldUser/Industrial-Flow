// Mock-Inhalt für den Monospace-Block in der Pipeline-Detail-View.
// Phase 4 ersetzt diese Konstante durch die echte Antwort des OT-Proxy-Agenten.
export const opcuaPreCheckLog = (pipelineId: string): string => {
  const ts = new Date().toISOString();
  return [
    `[${ts}] opcua-bridge: connecting to ot-proxy-agent (mTLS)`,
    `[${ts}] opcua-bridge: subscribed nodes for pipeline ${pipelineId}`,
    `[${ts}] check  ns=2;s=Channel1.Device1.MachineState   value=idle    expected=idle    OK`,
    `[${ts}] check  ns=2;s=Channel1.Device1.SpindleRpm     value=0       expected=0       OK`,
    `[${ts}] check  ns=2;s=Channel1.Device1.SafetyDoor     value=closed  expected=closed  OK`,
    `[${ts}] check  ns=2;s=Channel1.Device1.JobActive      value=false   expected=false   OK`,
    `[${ts}] opcua-bridge: production_lock evaluated -> safe`,
    `[${ts}] opcua-bridge: maintenance_window in 11h 04m`,
    `[${ts}] opcua-bridge: ready for blue-green deploy`,
  ].join('\n');
};
