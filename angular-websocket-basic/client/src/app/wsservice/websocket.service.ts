import {Observable} from 'rxjs';

export class WebSocketService{

  ws: WebSocket;
  socketIsOpen = 1; // WebSocket's open

  //method  client--->get data
  createObservableSocket(url:string): Observable<any>{
    this.ws = new WebSocket(url);

    return new Observable(
      observer => {

        this.ws.onmessage = (event) =>
          observer.next(event.data);

        this.ws.onerror = (event) => observer.error(event);

        this.ws.onclose = (event) => observer.complete();

        return () => {
          this.ws.close(1000, "The user disconnected");
        }
      }
    );
  }
  //duplex

  //server-->client

  sendMessage(message: string): string{
    if (this.ws.readyState === this.socketIsOpen) {
      this.ws.send(message);
      return `Sent to server ${message}`;
    } else {
      return 'Message was not sent - the socket is closed';
    }
  }
}
