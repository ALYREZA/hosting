import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { writeFileSync } from 'fs';
import { nanoid } from 'nanoid'


export const load:PageServerLoad = async({ cookies }) => {
    const token = await cookies.get('token');
    return { token };
  }
   
  export const actions: Actions = {
      post: async ({ request }) => {
        const token = (await request.formData()).get("token");
          const files = (await request.formData()).getAll("files");
          files.map( (file:any) => {
            writeFileSync(`static/${file.name}`, file, 'base64');
          } );
      return { success: true };
    }
  };