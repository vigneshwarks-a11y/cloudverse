declare module "@netlify/edge-functions" {
  export interface Context {
    next(request?: Request): Promise<Response>;
  }
}
