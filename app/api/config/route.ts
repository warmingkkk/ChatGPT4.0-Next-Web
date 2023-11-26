import { NextRequest, NextResponse } from "next/server";

import { getServerSideConfig } from "../../config/server";

const serverConfig = getServerSideConfig();

// Danger! Do not hard code any secret value here!
// 警告！不要在这里写入任何敏感信息！
const DANGER_CONFIG = {
  needCode: serverConfig.needCode,
  hideUserApiKey: serverConfig.hideUserApiKey,
  disableGPT4: serverConfig.disableGPT4,
  hideBalanceQuery: serverConfig.hideBalanceQuery,
  disableFastLink: serverConfig.disableFastLink,
  customModels: serverConfig.customModels,
};

declare global {
  type DangerConfig = typeof DANGER_CONFIG;
}

// List of disabled regions
const DISABLED_REGIONS = ['HKG1'];

async function handle(request: NextRequest) {
  // Check if the region is disabled
  if (DISABLED_REGIONS.includes(request.cf.colo)) {
    return new NextResponse('Service not available in your region', { status: 403 });
  }

  return NextResponse.json(DANGER_CONFIG);
}

export const GET = handle;
export const POST = handle;

export const runtime = "edge";
