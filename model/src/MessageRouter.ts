export class MessageRouter {
  private sinks = [];

  public post(msg: any) {
    // Return immediately, but give the caller a way to see when their message's posted.
    return new Promise<void>(resolve => {
      for (let i = 0; i < this.sinks.length; ++i)
        this.sinks[i](msg);
      resolve(msg);
    });
  }

  public addSink(sink: (msg: any) => any) {
    this.sinks.push(sink);
  }
}
