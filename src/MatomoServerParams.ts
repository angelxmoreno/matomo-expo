namespace MatomoServerParams {
    // Required parameters interface
    export interface RequiredParams {
        idsite: number; // The ID of the website we're tracking a visit/action for.
        rec: number;    // Required for tracking, must be set to one, eg, &rec=1.
    }

    // Recommended parameters interface
    export interface RecommendedParams {
        action_name?: string; // The title of the action being tracked.
        url?: string;         // The full URL for the current action.
        _id?: string;         // The unique visitor ID.
        rand?: number;        // Meant to hold a random value.
        apiv?: number;        // The API version to use.
    }

    // Optional User info interface
    export interface OptionalUserInfoParams {
        urlref?: string; // The full HTTP Referrer URL.
        res?: string;    // The resolution of the device.
        h?: number;      // The current hour (local time).
        m?: number;      // The current minute (local time).
        s?: number;      // The current second (local time).
        plugins?: {
            fla?: number;
            java?: number;
            dir?: number;
            qt?: number;
            realp?: number;
            pdf?: number;
            wma?: number;
            gears?: number;
            ag?: number;
        };
        cookie?: number; // When set to 1, the visitor's client is known to support cookies.
        ua?: string;     // An override value for the User-Agent HTTP header field.
        uadata?: string; // JSON encoded Client Hints collected by javascript.
        lang?: string;   // An override value for the Accept-Language HTTP header field.
        uid?: string;    // Defines the User ID for this request.
        cid?: string;    // Defines the visitor ID for this request.
        new_visit?: number; // If set to 1, will force a new visit to be created for this action.
        dimension?: Record<number, string>; // A Custom Dimension value for a specific Custom Dimension ID.
        _cvar?: string; // Visit scope custom variables. JSON encoded string of the custom variable array.
    }

    // Optional Acquisition Channel Attribution interface
    export interface OptionalAcquisitionParams {
        _rcn?: string; // The Campaign name used to attribute goal conversions.
        _rck?: string; // The Campaign keyword used to attribute goal conversions.
    }

    // Optional Action info interface
    export interface OptionalActionParams {
        cvar?: string; // Page scope custom variables. JSON encoded string of the custom variable array.
        link?: string; // An external URL the user has opened. Used for tracking outlink clicks.
        download?: string; // URL of a file the user has downloaded. Used for tracking downloads.
        search?: string; // The Site Search keyword.
        search_cat?: string; // When search is specified, you can optionally specify a search category with this parameter.
        search_count?: number; // When search is specified, we also recommend setting the search_count to the number of search results displayed on the results page.
        pv_id?: string; // Accepts a six character unique ID that identifies which actions were performed on a specific page view.
        idgoal?: number; // If specified, the tracking request will trigger a conversion for the goal of the website being tracked with this ID.
        revenue?: number; // A monetary value that was generated as revenue by this goal conversion.
        cs?: string; // The charset of the page being tracked.
        dimension?: Record<number, string>; // A Custom Dimension value for a specific Custom Dimension ID.
        ca?: number; // Stands for custom action. &ca=1 can be optionally sent along any tracking request that isn't a page view.
    }

    // Optional Page Performance info interface
    export interface OptionalPagePerformanceParams {
        pf_net?: number; // Network time. How long it took to connect to the server.
        pf_srv?: number; // Server time. How long it took the server to generate the page.
        pf_tfr?: number; // Transfer time. How long it takes the browser to download the response from the server.
        pf_dm1?: number; // Dom processing time. How long the browser spends loading the webpage after the response was fully received until the user can start interacting with it.
        pf_dm2?: number; // Dom completion time. How long it takes for the browser to load media and execute any Javascript code listening for the DOMContentLoaded event.
        pf_onl?: number; // Onload time. How long it takes the browser to execute Javascript code waiting for the window.load event.
    }

    // Optional Event Tracking info interface
    export interface OptionalEventTrackingParams {
        e_c?: string; // The event category.
        e_a?: string; // The event action.
        e_n?: string; // The event name.
        e_v?: number; // The event value. Must be a float or integer value (numeric), not a string.
    }

    // Optional Content Tracking info
    export interface ContentTrackingInfo {
        c_n?: string; // Content name
        c_p?: string; // Content piece (path to image, video, audio, text)
        c_t?: string; // Target of the content (URL of landing page)
        c_i?: string; // Interaction with the content (e.g., 'click')
    }

    export interface EcommerceItem {
        sku: string; // Item SKU (required)
        name: string; // Item name (or empty string if not applicable)
        category: string; // Item category (or empty string if not applicable)
        price: number; // Item price (or 0 if not applicable)
        quantity: number; // Item quantity (or 1 if not applicable)
    }

    export interface EcommerceInfo {
        ec_id: string; // Unique identifier for ecommerce order
        ec_items: EcommerceItem[]; // JSON encoded array of ecommerce items
        revenue: number; // Grand total for the ecommerce order
        ec_st?: number; // Sub total of the order (excludes shipping)
        ec_tx?: number; // Tax amount of the order
        ec_sh?: number; // Shipping cost of the order
        ec_dt?: number; // Discount offered
    }

    export interface CrashRequest {
        ca: string; // Must always be included and always set to 1
        cra: string; // The message of the error (required)
        cra_st?: string; // The stack trace of the error (optional)
        cra_ct?: string; // The category of the error (optional)
        cra_tp?: string; // The error type (optional)
        cra_ru?: string; // A URI for the source file that originated the error (optional)
        cra_rl?: string; // The line of the source file where the error occurred (optional)
        cra_rc?: string; // The column of the source file where the error occurred (optional)
    }

    export interface OtherParameters {
        send_image?: number; // If set to 0, Matomo will respond with an HTTP 204 response code instead of a GIF image.
        ping?: number; // If set to 1, the request will be a Heartbeat request, updating the visit's total time.
        bots?: number; // To enable Bot Tracking in Matomo, set to 1.
    }

}