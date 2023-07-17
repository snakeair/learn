export default function errImg() {
  const errImgFn = async (el: any) => {
    let img = await import("@/assets/images/img-13.png");
    el.target.setAttribute("src", img.default);
  };
  return {
    errImgFn,
  };
}
