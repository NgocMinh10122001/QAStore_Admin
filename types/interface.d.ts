interface CloudinaryUploadWidgetResult {
    info?: CloudinaryInfo;
    event?: string;
    uw_event?: boolean;
    data?: CloudinaryEventData;
}

interface CloudinaryInfo {
    files?: CloudinaryFile[];
}

interface CloudinaryEventData {
    type?: string;
    widgetId?: string;
    event?: string;
    info?: CloudinaryInfo;
}

interface CloudinaryFile {
    id: string;
    batchId: string;
    name: string;
    size: number;
    type: string;
    imageDimensions: unknown[];
    status: string;
    progress: number;
    done: boolean;
    failed: boolean;
    aborted: boolean;
    paused: boolean;
    partOfBatch: boolean;
    publicId: string;
    preparedParams: Record<string, unknown>;
    camera: boolean;
    coordinatesResize: boolean;
    delayedPreCalls: boolean;
    publicIdCounter: number;
    isFetch: boolean;
    dimensions: [number, number];
    statusText: string;
    uploadedAt: number;
    uploadInfo: CloudinaryUploadInfo;
    timeout: boolean;
}

interface CloudinaryUploadInfo {
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    asset_folder: string;
    display_name: string;
    original_filename: string;
    path: string;
    thumbnail_url: string;
}