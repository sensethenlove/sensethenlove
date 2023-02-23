export default (theme: string) => {
  const buttons = 'bold,italic,underline,strikethrough,ul,ol,fontsize,hr,link,symbols,indent,outdent,left,right,center,undo,redo,fullsize,preview'

  return {
    buttons,
    autofocus: true,
    statusbar: false,
    buttonsMD: buttons,
    buttonsSM: buttons,
    buttonsXS: buttons,
    disablePlugins: 'table,iframe',
    theme: theme === 'dark' ? 'dark' : 'default',
    placeholder: 'Share a lovely goal, achievement or goal progress!',
    cleanHTML: {
      allowTags: {
        hr: true,
        br: true,
        p: { style: true },
        u: { style: true },
        s: { style: true },
        em: { style: true },
        ol: { style: true },
        ul: { style: true },
        li: { style: true },
        span: { style: true },
        strong: { style: true },
        a: { style: true, href: true, src: true, target: true, title: true },
      }
    }
  }
}
