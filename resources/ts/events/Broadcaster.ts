import mitt, { Emitter, Handler } from "mitt";

class Broadcaster {

    broadcaster: Emitter<any>

    constructor(){
        this.broadcaster = mitt()
    }

    fire(event:string, data: any = null){
        return this.broadcaster.emit(event, data);
    }

    listen<T=any>(event: string, callback: Handler<T>){
        return this.broadcaster.on(event, callback);
    }

    forget<T=any>(event: string, callback: Handler<T>){
        return this.broadcaster.off(event, callback);
    }

    emitter(){
        return this.broadcaster;
    }
}

const _broadcaster = new Broadcaster();

export default _broadcaster;
