//https://clerk.com/docs/references/nextjs/current-user#current-user
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";

import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";

async function Home({searchParams}: {searchParams: { [key: string]: string | undefined }}) {
    const user = await currentUser();

    //descomentar estas tres lineas para que los usuarios inicien sesion o se registren primero antes de ver el contenido del sitio
    /*if (!user) return null; 
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");*/

    //codigo para ver los post sin iniciar sesion previamente, 
    if (user) {
        const userInfo = await fetchUser(user.id);

        //si el usuario no tiene informacion completa, se le redirecciona a otro ruta
        if (!userInfo?.onboarded) redirect("/onboarding");
    }

    //linea de codigo para reemplazar para ocultar los post sin iniciar sesion
    //currentUserId={user.id}

    //"1, 5", el numero 1 es el numero de pagina de los post, y el 5 es la cantidad de post que se mostraran por cada pagina
    //podemos ponerle la cantidad de post mostrados por pagina.
    const result = await fetchPosts(searchParams.page ? +searchParams.page : 1, 5);

    return (
        <>
            <h1 className='head-text text-left'>Home</h1>

            <section className='mt-9 flex flex-col gap-10'>
                {result.posts.length === 0 ? (
                    <p className='no-result'>No threads found</p>
                ) : (
                    <>
                        {result.posts.map((post) => (
                            <ThreadCard
                                key={post._id}
                                id={post._id}
                                currentUserId={user ? user.id : ''}
                                parentId={post.parentId}
                                content={post.text}
                                author={post.author}
                                community={post.community}
                                createdAt={post.createdAt}
                                comments={post.children}
                            />
                        ))}
                    </>
                )}
            </section>

            <Pagination
                path='/'
                pageNumber={searchParams?.page ? +searchParams.page : 1}
                isNext={result.isNext}
            />
        </>
    );
}

export default Home;
