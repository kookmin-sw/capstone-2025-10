export const getProductBySectionId = async (sectionId) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "JSESSIONID=6E628C706E2056FA5F2101D1F577F0C2");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(
    "http://localhost:8080/api/products/section/1",
    requestOptions,
  );
};
