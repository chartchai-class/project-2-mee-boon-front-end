import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const UseCommentStore = defineStore('commentStore', () => {
  const comments = ref<{ [key: string]: { comments: string[]; flagUrl: string } }>({})
  const sortOption = ref('newset')

  const sortedComments = computed(() => {
    return [...comments.value].sort((a, b) => {
      if (sortOption.value === 'newset') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
  })
  const addComment = (country: string, comment: string, flagUrl: string) => {
    if (!comments.value[country]) {
      comments.value[country] = {
        comments: [],
        flagUrl: flagUrl
      }
    }
    comments.value[country].comments.push(comment)
  }

  return { sortedComments, comments, sortOption, addComment }
})
