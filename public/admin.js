$(() => {
  $(".date").each( (index, obj) => {
    console.log($(obj).text());
    const d = new Date($(obj).text());
    $(obj).text(d.toLocaleTimeString("it-IT"));
  })
});
