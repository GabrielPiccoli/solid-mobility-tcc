import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)

    if (!cookies['solidmobility.token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      destroyCookie(ctx, 'solidmobility.token')

      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  }
}