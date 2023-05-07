// import type { Action } from '@sveltejs/kit'
// import schema from '$lib/schema/createPost'
// import writeImage from '$lib/file/writeImage'
// import createPost from '$lib/prisma/createPost'
// import updatePost from '$lib/prisma/updatePost'
// import actionCatch from '$lib/catch/actionCatch'
// import getImageName from '$lib/file/getImageName'
// import htmlSanitize from '$lib/util/htmlSanitize'
// import isFileAnImage from '$lib/file/isFileAnImage'
// import validateFields from '$lib/form/validateFields'
// import { getFormEntries } from '@sensethenlove/get-form-entries'


// export default (async ({ request, locals }) => {
//   try {
//     const fields = getFormEntries(await request.formData())
//     fields.creatorId = locals.userId, // necessary for createPost
//     fields.content = htmlSanitize(fields.content.toString()) // sanitize html input
//     await validateFields(fields, schema) // validate form fits requirements

//     if (!fields.images.length) await createPost(fields) // create post w/o image considerations
//     else {
//       for (const image of fields.images) {
//         isFileAnImage(image) // if any file is not an image an error will throw
//       }

//       const post = await createPost(fields)

//       const writeResponse = await Promise.all(fields.images.map((image: File) => { // write all images in cloudflare
//         return writeImage(image, getImageName('post', post.id)) 
//       }))

//       await updatePost(post.id, { // add image id's to post
//         images: {
//           connectOrCreate: writeResponse.map(id => {
//             return {
//               where: { id },
//               create: { id },
//             }
//           })
//         }
//       })
//     }
//   } catch (e) {
//     return actionCatch(e)
//   }
// }) satisfies Action
