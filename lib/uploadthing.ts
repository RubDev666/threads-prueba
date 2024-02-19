// Resource: https://docs.uploadthing.com/api-reference/react#generatereacthelpers
// Copy paste (be careful with imports)

//https://docs.uploadthing.com/getting-started/appdir#create-the-uploadthing-components-recommended
import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
