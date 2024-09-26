import { db } from 'src/lib/db'

import {
  comments,
  comment,
  createComment,
  updateComment,
  deleteComment,
} from './comments'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('comments', () => {
  scenario(
    'returns all comments for a single post from the database',
    async (scenario) => {
      const result = await comments({ postId: scenario.comment.jane.postId })
      const post = await db.post.findUnique({
        where: { id: scenario.comment.jane.postId },
        include: { comments: true },
      })
      expect(result.length).toEqual(post.comments.length)
    }
  )

  scenario('postOnly', 'creates a new comment', async (scenario) => {
    const comment = await createComment({
      input: {
        name: 'Billy Bob',
        body: 'What is your favorite tree bark?',
        post: {
          connect: { id: scenario.post.bark.id },
        },
      },
    })

    expect(comment.name).toEqual('Billy Bob')
    expect(comment.body).toEqual('What is your favorite tree bark?')
    expect(comment.postId).toEqual(scenario.post.bark.id)
    expect(comment.createdAt).not.toEqual(null)
  })

  scenario('returns a single comment', async (scenario) => {
    const result = await comment({ id: scenario.comment.one.id })

    expect(result).toEqual(scenario.comment.one)
  })

  scenario('creates a comment', async () => {
    const result = await createComment({
      input: { name: 'String', body: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.body).toEqual('String')
  })

  scenario('updates a comment', async (scenario) => {
    const original = await comment({ id: scenario.comment.one.id })
    const result = await updateComment({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a comment', async (scenario) => {
    const original = await deleteComment({
      id: scenario.comment.one.id,
    })
    const result = await comment({ id: original.id })

    expect(result).toEqual(null)
  })
})
