/**
 * Created by LenovoZ510 on 2017. 03. 16..
 */
export class Configuration{

    private _battery;
    private _connection;
    private _os;

    get battery() {
        return this._battery;
    }

    set battery(value) {
        this._battery = value;
    }

    get connection() {
        return this._connection;
    }

    set connection(value) {
        this._connection = value;
    }

    get os() {
        return this._os;
    }

    set os(value) {
        this._os = value;
    }
}