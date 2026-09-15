/** Configure only with the actual GHL External Tracking snippet supplied by the account owner.
 * Copy its external script URL and required attributes here; no vendor API is assumed.
 * adapter must call the verified GHL event API. dispose must revoke/clean up that integration.
 * matchSubmission must validate the real GHL success message, including its form ID.
 * See README.md. Do not send form values or other personal data in event properties.
 */
export const trackingConfig = {
 scriptUrl: process.env.NEXT_PUBLIC_GHL_TRACKING_SCRIPT_URL || '',
 scriptAttributes: {} as Record<string,string>,
 adapter: null as null | ((event: string, properties: Record<string,string>) => void),
 dispose: null as null | (()=>void),
 matchSubmission: null as null | ((data: unknown) => boolean),
};
