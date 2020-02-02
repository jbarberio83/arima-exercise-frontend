export class Pager {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: number[];
    sDate: string;
    eDate: string;

    constructor(currentPage: number) {
        this.currentPage = currentPage;
    }
}