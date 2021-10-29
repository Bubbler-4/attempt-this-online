import * as msgpack from '@msgpack/msgpack';

const BASE_URL = process.env.NEXT_PUBLIC_ATO_BASE_URL || '';

interface RunAPIResponse {
  stdout: Uint8Array;
  stderr: Uint8Array;
  status_type: 'exited' | 'killed' | 'core_dumped' | 'unknown';
  status_value: number;
  timed_out: boolean;
  real: number;
  kernel: number;
  user: number;
  max_mem: number;
  waits: number;
  preemptions: number;
  major_page_faults: number;
  minor_page_faults: number;
  input_ops: number;
  output_ops: number;
}

interface MetadataItem {
  name: string;
  image: string;
  version: string;
  SE_class: string;
  sbcs: string;
  url: string;
}

async function run({
  language,
  input,
  code,
  options,
  programArguments,
  timeout,
}: {
  language: string,
  input: Uint8Array,
  code: Uint8Array,
  options: string[],
  programArguments: string[],
  timeout: number,
}) {
  const response = await fetch(`${BASE_URL}/api/v0/execute`, {
    method: 'POST',
    body: msgpack.encode({
      language,
      code,
      input,
      options,
      arguments: programArguments,
      timeout,
    }),
  });
  if (!response.ok || !response.body) {
    throw new Error(await response.text());
  }
  return await msgpack.decodeAsync(response.body) as RunAPIResponse;
}

async function getMetadata() {
  const response = await fetch(`${BASE_URL}/api/v0/metadata`, { method: 'GET' });
  if (!response.ok || !response.body) {
    throw new Error(await response.text());
  }
  return await msgpack.decodeAsync(response.body) as Record<string, MetadataItem>;
}

export { BASE_URL, run, getMetadata };
export type { RunAPIResponse, MetadataItem };
