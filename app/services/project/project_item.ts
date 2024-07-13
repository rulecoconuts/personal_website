class ProjectItem {
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get url(): string {
        return this._url;
    }
    public set url(value: string) {
        this._url = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get dateAdded(): string {
        return this._dateAdded;
    }
    public set dateAdded(value: string) {
        this._dateAdded = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    constructor(private _id: string,
        private _dateAdded: string,
        private _name: string,
        private _url: string,
        private _description: string
    ) {

    }
}

export default ProjectItem;