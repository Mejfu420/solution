import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";

if (typeof global.ResizeObserver === "undefined") {
    global.ResizeObserver = class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
}

if (typeof window === 'undefined') {
    global.window = {
        addEventListener: () => { },
        removeEventListener: () => { },
        matchMedia: () => ({ matches: false, addListener: () => { }, removeListener: () => { } }),
        getComputedStyle: () => ({}),
    };
    global.document = {
        addEventListener: () => { },
        removeEventListener: () => { },
        createElement: () => ({}),
        documentElement: { style: {} },
        body: { style: {} },
        getElementsByTagName: () => [],
    };
    global.navigator = { userAgent: 'node.js' };
}

export default function handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    routerContext,
    loadContext
) {
    return new Promise((resolve, reject) => {
        let shellRendered = false;
        const { pipe, abort } = renderToPipeableStream(
            <ServerRouter context={routerContext} url={request.url} />,
            {
                onShellReady() {
                    shellRendered = true;
                    const body = new PassThrough();
                    const stream = createReadableStreamFromReadable(body);

                    responseHeaders.set("Content-Type", "text/html");
                    resolve(
                        new Response(stream, {
                            headers: responseHeaders,
                            status: responseStatusCode,
                        })
                    );
                    pipe(body);
                },
                onShellError(error) {
                    reject(error);
                },
                onError(error) {
                    responseStatusCode = 500;
                    if (shellRendered) {
                        console.error(error);
                    }
                },
            }
        );

        setTimeout(abort, 5000);
    });
}