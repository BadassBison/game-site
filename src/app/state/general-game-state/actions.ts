import { ElementRef } from '@angular/core';

export class SetCanvas {
    static readonly type = '[General] Set Canvas';
    constructor(public canvas: ElementRef<HTMLCanvasElement>) {}
}

export class SetCtx {
    static readonly type = '[General] Set Ctx';
    constructor(public ctx: CanvasRenderingContext2D) {}
}

export class SetWidthAndHeight {
    static readonly type = '[General] Set Width and Height';
    constructor(public widthAndHeight: number[]) {}
}
