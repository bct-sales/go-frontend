import { range } from "./util";

export interface Spacing
{
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export interface LabelLayoutData
{
    paperWidth: number;
    paperHeight: number;
    paperMargins: Spacing;
    columns: number;
    rows: number;
    labelMargins: Spacing;
    labelPadding: Spacing;
    fontSize: number;
}

export interface Rectangle
{
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Label
{
    border: Rectangle;
    usableSpace: Rectangle;
}

export class LayoutHelper
{
    public constructor(public readonly labelLayout: LabelLayoutData) { }

    public get usablePaperWidth(): number
    {
        return this.labelLayout.paperWidth - this.labelLayout.paperMargins.left - this.labelLayout.paperMargins.right;
    }

    public get usablePaperHeight(): number
    {
        return this.labelLayout.paperHeight - this.labelLayout.paperMargins.top - this.labelLayout.paperMargins.bottom;
    }

    public get gridCellWidth(): number
    {
        return this.usablePaperWidth / this.labelLayout.columns;
    }

    public get gridCellHeight(): number
    {
        return this.usablePaperHeight / this.labelLayout.rows;
    }

    public getGridCellRectangle(column: number, row: number): Rectangle
    {
        const x = this.labelLayout.paperMargins.left + column * this.gridCellWidth;
        const y = this.labelLayout.paperMargins.top + row * this.gridCellHeight;
        const width = this.gridCellWidth;
        const height = this.gridCellHeight;

        return { x, y, width, height };
    }

    public getLabelRectangle(column: number, row: number): Rectangle
    {
        const cellRectangle = this.getGridCellRectangle(column, row);

        return deflateRectangle(cellRectangle, this.labelLayout.labelMargins);
    }

    public getLabelUsableRectangle(column: number, row: number): Rectangle
    {
        const labelRectangle = this.getLabelRectangle(column, row);

        return deflateRectangle(labelRectangle, this.labelLayout.labelPadding);
    }

    public get labels(): Label[]
    {
        return range(0, this.labelLayout.columns).flatMap(column => range(0, this.labelLayout.rows).map(row => ({ border: this.getLabelRectangle(column, row), usableSpace: this.getLabelUsableRectangle(column, row) })));
    }
}

function deflateRectangle(rectangle: Rectangle, spacing: Spacing): Rectangle
{
    return {
        x: rectangle.x + spacing.left,
        y: rectangle.y + spacing.top,
        width: rectangle.width - spacing.left - spacing.right,
        height: rectangle.height - spacing.top - spacing.bottom
    };
}
