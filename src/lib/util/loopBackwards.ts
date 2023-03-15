export default (list: any[], callback: (item: any, splice: () => void) => void) => {
  const LIST_LENGTH_MINUS_ONE = list.length - 1

  for (let index = LIST_LENGTH_MINUS_ONE; index >= 0; index--) {
    callback(
      list[index],
      () => {
        if (list[index]?.constructor?.name?.startsWith('HTML')) list[index].remove()
        list.splice(index, 1)
      }
    )
  }
}
