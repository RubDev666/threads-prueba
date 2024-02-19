"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface Props {
    pageNumber: number;
    isNext: boolean; //si hay mas post esperando para ser mostrados
    path: string;
}

function Pagination({ pageNumber, isNext, path }: Props) {
    const router = useRouter();

    const handleNavigation = (type: string) => {
        let nextPageNumber = pageNumber;

        //"math.max()" devuelve el numero mayor que le pasamos como argumento
        if (type === "prev") nextPageNumber = Math.max(1, pageNumber - 1);
        if (type === "next") nextPageNumber = pageNumber + 1;

        if (nextPageNumber > 1) {
            router.push(`/${path}?page=${nextPageNumber}`);
        } else {
            router.push(`/${path}`);
        }
    };

    //ocultar paginacion si no hay suficientes o ningun post para mostrar en una pagina
    if (!isNext && pageNumber === 1) return null;

    return (
        <div className='pagination'>
            <Button
                onClick={() => handleNavigation("prev")}
                disabled={pageNumber === 1}
                className='!text-small-regular text-light-2'
            >
                Prev
            </Button>

            <p className='text-small-semibold text-light-1'>{pageNumber}</p>

            <Button
                onClick={() => handleNavigation("next")}
                disabled={!isNext}
                className='!text-small-regular text-light-2'
            >
                Next
            </Button>
        </div>
    );
}

export default Pagination;
