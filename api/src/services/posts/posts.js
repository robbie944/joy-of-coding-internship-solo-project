import { db } from 'src/lib/db'

export const posts = () => {
  if (!context.currentUser) {
    console.log('No user is logged in, showing all posts.')
    return db.post.findMany() // No filter, returns all posts
  }
  // User is logged in, filter by userId
  return db.post.findMany({ where: { userId: context.currentUser.id } })
}

export const post = ({ id }) => {
  return db.post.findUnique({
    where: { id },
    include: {
      user: true, // Include the associated user data in the query
    },
  })
}

export const Post = {
  user: (_obj, { root }) => db.user.findFirst({ where: { id: root.userId } }),
}
