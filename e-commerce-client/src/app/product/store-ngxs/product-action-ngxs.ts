export class GetProducts {
  static readonly type = '[Product] Get';
}

export class DeleteProduct {
  static readonly type = '[Product] Delete';
  constructor(public id: number) { }
}
