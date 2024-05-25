// export async function generateEmailTemplate(products) {
//   const apiUrl =
//     "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY_HERE";

//   const requestBody = {
//     contents: [
//       {
//         parts: [
//           {
//             text: `Please generate an email template with the following product details: ${JSON.stringify(
//               products
//             )}`,
//           },
//         ],
//       },
//     ],
//   };

//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     });

//     const data = await response.json();
//     const emailTemplate = data.candidates[0].content.parts[0].text;

//     return emailTemplate;
//   } catch (error) {
//     console.error("Error:", error);
//     return null;
//   }
// }

// export async function openEmailClient(email, products) {
//   const emailTemplate = await generateEmailTemplate(products);

//   if (emailTemplate) {
//     const subject = "Product Details";
//     const body = encodeURIComponent(emailTemplate);
//     const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
//       subject
//     )}&body=${body}`;
//     window.location.href = mailtoLink;
//   } else {
//     console.error("Failed to generate email template.");
//   }
// }

// src/utils/emailUtils.js
export async function generateEmailTemplate(products) {
  //   const apiUrl =
  //     "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBfyF26G-RvZPlfMSSuDbUtjHNOFqYnk8Y";

  const apiUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBfyF26G-RvZPlfMSSuDbUtjHNOFqYnk8Y";

  //   const requestBody = {
  //     prompt: {
  //       text: `Generate an email template with the following product details: ${JSON.stringify(
  //         products
  //       )}`,
  //     },
  //   };
  console.log(products);
  const requestBody = {
    contents: [
      {
        parts: [
          {
            // text: `這次訊息: ${message} 之前對話紀錄如下：${JSON.stringify(
            //   conversationHistory
            // )}`,
            // text: `我想先確認你看不看的到這個訊息，看的到的話跟我說早安`

            text: `生成一個email模板 有關於想要請求 賣家商品資訊 及 面交時間地點 商品資訊如下: ${JSON.stringify(
              products
            )} 但請不要使用Markdown格式，請給我純文字格式的email模板，請不要給我任何的* `,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      const emailTemplate = data.candidates[0].content.parts[0].text;
      return emailTemplate;
    } else {
      throw new Error("No candidates returned from API");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function openEmailClient(email, products) {
  const emailTemplate = await generateEmailTemplate(products);

  if (emailTemplate) {
    const subject = "Product Details";
    const body = encodeURIComponent(emailTemplate);
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    window.location.href = mailtoLink;
  } else {
    console.error("Failed to generate email template.");
  }
}
