declare module 'node-horseman' {
	interface BoundingBox {
		top: number;
		left: number;
		width: number;
		height: number;
	}

	interface Cookie {
		name: string;
		value: string;
		domain: string;
		secure?: boolean;
		expires?: Date;
		expiry?: number;
		httponly?: boolean;
		path?: string;
	}

	interface TypingOptions {
		/**
		 * Allowed: 'keypress', 'keyup', 'keydown'. Default is 'keypress'
		 */
		eventType: string;
		/**
		 * String in the form of ctrl+shift+alt.
		 */
		modifiers?: string;
	}

	interface HorsemanOptions {
		/**
		 * an array of local JavaScript files to load onto each page
		 */
		clientScripts?: string[];
		/**
		 * how long to wait for page loads or wait periods, default 5000 ms
		 */
		timeout?: number;
		/**
		 * how frequently to poll for page load state, default 50 ms
		 */
		interval?: number;
		/**
		 * port to mount the PhantomJS instance to, default 12401
		 */
		port?: number;
		/**
		 * load all inlined images, default true
		 */
		loadImages?: boolean;
		/**
		 * switch to new tab when created, default false
		 */
		switchToNewTab?: boolean;
		/**
		 * A file where to store/use cookies
		 */
		cookiesFile?: string;
		/**
		 * ignores SSL errors, such as expired or self-signed certificate errors
		 */
		ignoreSSLErrors?: boolean;
		/**
		 * sets the SSL protocol for secure connections [sslv3|sslv2|tlsv1|any], default any
		 */
		sslProtocol?: string;
		/**
		 * enables web security and forbids cross-domain XHR
		 */
		webSecurity?: boolean;
		/**
		 * whether jQuery is automatically loaded into each page. Default is true. If jQuery is already present on the page, it is not injected.
		 */
		injectJquery?: boolean;
		/**
		 * whether bluebird is automatically loaded into each page. Default is false. If true and Promise is already present on the page, it is not injected. If 'bluebird' it is always injected as Bluebird, whether Promise is present or not.
		 */
		injectBluebird?: boolean;
		/**
		 * whether or not to enable bluebird debug features. Default is false. If true non-minified bluebird is injected and long stack traces are enabled
		 */
		bluebirdDebug?: boolean;
		/**
		 * specify the proxy server to use address:port, default not set
		 */
		proxy?: string;
		/**
		 * specify the proxy server type [http|socks5|none], default not set
		 */
		proxyType?: string;
		/**
		 * specify the auth information for the proxy user:pass, default not set
		 */
		proxyAuth?: string;
		/**
		 * If PhantomJS is not installed in your path, you can use this option to specify the executable's location
		 */
		phantomPath?: string;
		/**
		 * Enable web inspector on specified port, default not set
		 */
		debugPort?: number;
		/**
		 * Autorun on launch when in debug mode, default is true
		 */
		debugAutorun?: boolean;
	}

	interface HorsemanConfiguration {
		/**
		 * Dynamically set proxy settings (requires PhantomJS 2.0.0 or above). The ip argument can either be the IP of the proxy server, or a URI of the form type://user:pass@ip:port.
		 *
		 * The port is optional and defaults to 80. The type is optional and defaults to 'http'. The user and pass are the optional username and password for authentication, by default no authentication is used.
		 */
		setProxy(ip: string, port?: number, type?: string, user?: string, password?: string): Horseman;

		/**
		 * Set the cookies used when requesting a page. You have to set the cookies before calling .open()
		 */
		cookies(cookie: Cookie): Horseman;
		cookies(cookies: Cookie[]): Horseman;
		cookies(cookieString: string): Horseman;

		/**
		 * Set the userAgent used by PhantomJS. You have to set the userAgent before calling .open()
		 */
		userAgent(userAgent: string): Horseman;

		/**
		 * Set the headers used when requesting a page. The headers are a javascript object. You have to set the headers before calling .open().
		 */
		headers(headers: Object): Horseman;

		/**
		 * Set the user and password for accessing a web page using basic authentication. Be sure to set it before calling .open(url)
		 */
		authentication(user: string, password: string): Horseman;

		/**
		 * Set the width and height of the viewport, useful for screenshotting. You have to set the viewport before calling .open()
		 */
		viewport(width: number, height: number): Horseman;

		/**
		 * Scroll to a position on the page, relative to the top left corner of the document
		 */
		scrollTo(top: number, left: number): Horseman;

		/**
		 * Set the amount of zoom on a page. The default zoomFactor is 1. To zoom to 200%, use a zoomFactor of 2. Combine this with viewport to produce high DPI screenshots.
		 */
		zoom(zoomFactor: number): Horseman;
	}

	interface HorsemanPageEvaluations {
		/**
		 * Get the title of the current page.
		 */
		title(): Promise<string>;

		/**
		 * Get the URL of the current page.
		 */
		url(): Promise<string>;

		/**
		 * Determines if a selector is visible, or not, on the page. Returns a boolean.
		 */
		visible(selector: string): Promise<boolean>;

		/**
		 * Determines if the selector exists, or not, on the page. Returns a boolean.
		 */
		exists(selector: string): Promise<boolean>;

		/**
		 * Counts the number of selector on the page. Returns a number.
		 */
		count(selector: string): Promise<boolean>;

		/**
		 * Gets the HTML inside of an element. If no selector is provided, it returns the HTML of the entire page. If file is provided, the HTML will be written to that filename.
		 */
		html(selector?: string, file?: string): Promise<string>;

		cookies(): Promise<Cookie[]>;

		/**
		 * Gets the text inside of an element.
		 */
		text(selector?: string): Promise<string>;

		/**
		 * Get, or set, the value of an element.
		 */
		value(selector: string, value?: string): Promise<string>;

		/**
		 * Gets an attribute of an element.
		 */
		attribute(selector: string, attribute: string): Promise<string>;

		/**
		 * Gets a CSS property of an element.
		 */
		cssProperty(selector: string, property: string): Promise<string>;

		/**
		 * Gets the width of an element.
		 */
		width(selector: string): Promise<number>;

		/**
		 * Gets the height of an element.
		 */
		height(selector: string): Promise<number>;

		/**
		 * Saves a screenshot of the current page to the specified path. Useful for debugging.
		 */
		screenshot(path: string): Promise<boolean>;

		/**
		 * Returns a base64 encoded string representing the screenshot. Type must be one of 'PNG', 'GIF', or 'JPEG'.
		 */
		screenshotBase64(type: string): Promise<string>;

		/**
		 * Takes a cropped screenshot of the page. area can be a string identifying an html element on the screen to crop to, or a getBoundingClientRect object.
		 */
		crop(selector: string, path: string): Promise<boolean>;
		crop(boundingBox: BoundingBox, path: string): Promise<boolean>;

		pdf(path: string, paperSize: Object): Promise<boolean>;

		/**
		 * Invokes fn on the page with args. On completion it returns a value. Useful for extracting information from the page.
		 */
		evaluate<T>(fn: () => T): Promise<T>;
		evaluate<T, aT1>(fn: (arg1: aT1) => T, arg1: aT1): Promise<T>;
		evaluate<T, aT1, aT2>(fn: (arg1: aT1, arg2: aT2) => T, arg1: aT1, agr2: aT2): Promise<T>;
		evaluate<T, aT1, aT2, aT3>(fn: (arg1: aT1, arg2: aT2, arg3: aT3) => T, arg1: aT1, arg2: aT2, arg3: aT3): Promise<T>;
		evaluate<T, aT1, aT2, aT3, aT4>(fn: (arg1: aT1, arg2: aT2, arg3: aT3, arg4: aT4) => T, arg1: aT1, arg2: aT2, arg3: aT3, arg4: aT4): Promise<T>;
	}

	interface HorsemanPageInteractions {
		/**
		 * Clicks the selector element once.
		 */
		click(selector?: string): HorsemanPage;

		/**
		 * Sets the value of a select element to value.
		 */
		select(selector: string, value: any): HorsemanPage;

		/**
		 * Sets the value of an element to ''.
		 */
		clear(selector: string): HorsemanPage;

		/**
		 * Enters the text provided into the selector element.
		 */
		type(selector: string, text: string, options?: TypingOptions): HorsemanPage;

		/**
		 * Specify the path to upload into a file input selector element.
		 */
		upload(selector: string, path: string): HorsemanPage;

		/**
		 * Inject a JavaScript file onto the page.
		 */
		injectJs(file: string): HorsemanPage;

		/**
		 * Include an external JavaScript script on the page via URL.
		 */
		includeJs(url: string): HorsemanPage;

		/**
		 * Send a mouse event to the page. Each event is sent to the page as if it comes from real user interaction.
		 *
		 * @param type 'mouseup', 'mousedown', 'mousemove', 'doubleclick', or 'click' (default)
		 */
		mouseEvent(type: string, x?: number, y?: number, button?: string): HorsemanPage;

		/**
		 * Send a keyboard event to the page. Each event is sent to the page as if it comes from real user interaction.
		 *
		 * @param type 'keyup', 'keydown', or 'keypress' (default)
		 * @param key https://github.com/ariya/phantomjs/commit/cab2635e66d74b7e665c44400b8b20a8f225153a
		 */
		keyboardEvent(type: string, key: number, modifier?: number): HorsemanPage;

		/**
		 * Wait for ms milliseconds
		 */
		wait(ms: number): HorsemanPage;

		/**
		 * Wait until a page finishes loading, typically after a .click().
		 */

		waitForNextPage(): HorsemanPage;

		/**
		 * Wait until the element selector is present, e.g., .waitForSelector('#pay-button')
		 */
		waitForSelector(selector: string): HorsemanPage;

		/**
		 * Wait until the fn evaluated on the page returns the specified value. fn is invoked with args.
		 */
		waitFor<T>(fn: () => T, value: T): HorsemanPage;
		waitFor<T, aT1>(fn: (arg1: aT1) => T, arg1: aT1, value: T): HorsemanPage;
		waitFor<T, aT1, aT2>(fn: (arg1: aT1, arg2: aT2) => T, arg1: aT1, agr2: aT2, value: T): HorsemanPage;
		waitFor<T, aT1, aT2, aT3>(fn: (arg1: aT1, arg2: aT2, arg3: aT3) => T, arg1: aT1, arg2: aT2, arg3: aT3, value: T): HorsemanPage;
		waitFor<T, aT1, aT2, aT3, aT4>(fn: (arg1: aT1, arg2: aT2, arg3: aT3, arg4: aT4) => T, arg1: aT1, arg2: aT2, arg3: aT3, arg4: aT4, value: T): HorsemanPage;
	}

	interface HorsemanFrameManager {
		/**
		 * Get the name of the current frame.
		 */
		frameName(): Promise<string>;

		/**
		 * Get the number of frames inside the current frame.
		 */
		frameCount(): Promise<number>;

		/**
		 * Get the names of the frames inside the current frame.
		 */
		frameNames(): Promise<string[]>;

		/**
		 * Switch to the frame that is in focus.
		 */
		switchToFocusedFrame(): HorsemanPage;

		/**
		 * Switch to the frame specified by a frame name or a frame position.
		 */
		switchToFrame(name: string): HorsemanPage;
		switchToFrame(position: number): HorsemanPage;

		/**
		 * Switch to the main frame of the page.
		 */
		switchToMainFrame(): HorsemanPage;

		/**
		 * Switch to the parent frame of the current frame. Resolves to true it switched frames and false if it did not (i.e., the main frame was the current frame).
		 */
		switchToParentFrame(): HorsemanPage;
	}

	interface HorsemanPage extends HorsemanPageEvaluations, HorsemanPageInteractions, HorsemanFrameManager {
		/**
		 * Go back to the previous page.
		 */
		back(): this;

		/**
		 * Go forward to the next page.
		 */
		forward(): this;

		/**
		 * The HTTP status code returned for the page just opened.
		 */
		status(): this;

		/**
		 * Refresh the current page
		 */
		reload(): this;

		close(): void;
	}

	interface Horseman extends HorsemanConfiguration {
		new(options?: HorsemanOptions): this;

		/**
		 * Load the page at url
		 */
		open(url: string): HorsemanPage;

		/**
		 * POST postData to the page at url
		 */
		post(url: string, postData: Object): HorsemanPage;

		/**
		 * PUT putData to the page at url
		 */
		put(url: string, putData: Object): HorsemanPage;

		close(): void;
	}

	const horseman: Horseman;

	export = horseman;
}
