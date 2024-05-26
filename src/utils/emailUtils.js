// src/utils/emailUtils.js
import router from "@/router"; // 假設你的router文件在src/router.js

export async function generateEmailTemplate(
  seller,
  products,
  user,
  slot = null
) {
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
  //   console.log(user);
  //   console.log(products);
  let requestBody = null;
  if (user === null) {
    //商品詳情 還沒下訂前
    requestBody = {
      contents: [
        {
          parts: [
            {
              text: `生成一個email模板 有關於想要請求 賣家商品資訊 商品資訊如下: ${JSON.stringify(
                products
              )} 賣家nickname ${
                seller.nickname
              } 但請不要使用Markdown格式，請給我純文字格式的email模板，請不要給我任何的*下面是email模板範例:
       商家nickname您好
       我是NCU二手物交易網站的用戶，我對您的商品有興趣，商品詳情為:名稱，價格，狀況，請問以下問題:
         我對您的商品有興趣，請問以下問題:
         (用戶請在這裡填入其他問題(不是給你gemeni填的))
感謝您的抽空閱讀這封郵件，期待您的回覆。
祝，學術順利
            `,
            },
          ],
        },
      ],
    };
  } else {
    //下訂後 訊問面交

    //     router.push({ name: "map" });

    //     // Listen for the custom event 'confirm-selection'
    //     window.addEventListener(
    //       "confirm-selection",
    //       async (event) => {
    //         const slot = event.detail;
    //         const emailTemplate = await generateEmailTemplate(
    //           seller,
    //           products,
    //           user
    //         );

    //         if (emailTemplate) {
    //           const subject = "商品詢問-NCU二手物交易網";
    //           const body = encodeURIComponent(
    //             `${emailTemplate}\n\n面交時間: ${slot.date} ${slot.time}\n面交地點: ${slot.location}`
    //           );
    //           const mailtoLink = `mailto:${
    //             seller.email
    //           }?subject=${encodeURIComponent(subject)}&body=${body}`;
    //           window.location.href = mailtoLink;
    //         } else {
    //           console.error("Failed to generate email template.");
    //         }
    //       },
    //       { once: true }
    //     ); // Add the event listener once
    //     requestBody = {
    //       contents: [
    //         {
    //           parts: [
    //             {
    //               text: `生成一個email模板 有關於想要請求 面交 時間 地點 商品資訊如下: ${JSON.stringify(
    //                 products
    //               )}， 商家nickname ${seller.nickname} ，用戶nickname:${
    //                 user.nickname
    //               } 但請不要使用Markdown格式，請給我純文字格式的email模板，請不要給我任何的*下面是email模板範例:

    //              商家${seller.nickname}您好
    //              我是NCU二手物交易網站的用戶${
    //                user.nickname
    //              }，我已經下訂了你的商品，商品詳情為:名稱，價格，狀況，請問以下問題:
    //                方便什麼時間面交?
    //                 面交地點在哪裡?
    //                 (用戶請在這裡填入其他問題(不是給你gemeni填的))
    //                 感謝您的抽空閱讀這封郵件，期待您的回覆。
    // 祝，學術順利
    //                   `,
    //             },
    //           ],
    //         },
    //       ],
    //     };
    //   }

    //   try {
    //     const response = await fetch(apiUrl, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(requestBody),
    //     });

    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }

    //     const data = await response.json();

    //     if (data.candidates && data.candidates.length > 0) {
    //       const emailTemplate = data.candidates[0].content.parts[0].text;
    //       return emailTemplate;
    //     } else {
    //       throw new Error("No candidates returned from API");
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //     return null;
    //   }

    if (!slot) {
      // Save parameters to localStorage
      localStorage.setItem("seller", JSON.stringify(seller));
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("user", JSON.stringify(user));

      router.push(/*{ name: "map" }*/ "/map");

      window.addEventListener(
        "confirm-selection",
        async (event) => {
          const selectedSlot = event.detail;

          // Retrieve parameters from localStorage
          const storedSeller = JSON.parse(localStorage.getItem("seller"));
          const storedProducts = JSON.parse(localStorage.getItem("products"));
          const storedUser = JSON.parse(localStorage.getItem("user"));

          const emailTemplate = await generateEmailTemplate(
            storedSeller,
            storedProducts,
            storedUser,
            selectedSlot
          );

          if (emailTemplate) {
            const subject = "商品詢問-NCU二手物交易網";
            const body = encodeURIComponent(emailTemplate);
            const mailtoLink = `mailto:${
              storedSeller.email
            }?subject=${encodeURIComponent(subject)}&body=${body}`;
            window.location.href = mailtoLink;

            // Clear parameters from localStorage after use
            localStorage.removeItem("seller");
            localStorage.removeItem("products");
            localStorage.removeItem("user");
          } else {
            console.error("Failed to generate email template.");
          }
        },
        { once: true }
      );

      return; // 暫停函數執行，等待用戶選擇時間和地點
    }

    requestBody = {
      contents: [
        {
          parts: [
            {
              text: `生成一個email模板 有關於想要請求 面交 時間 地點 商品資訊如下: ${JSON.stringify(
                products
              )}， 商家nickname ${seller.nickname} ，用戶nickname:${
                user.nickname
              } 但請不要使用Markdown格式，請給我純文字格式的email模板，請不要給我任何的*下面是email模板範例:
          商家${seller.nickname}您好
          我是NCU二手物交易網站的用戶${
            user.nickname
          }，我已經下訂了你的商品，商品詳情為:名稱，價格，狀況，請問以下問題:
          方便什麼時間面交?
          面交地點在哪裡?
          面交時間: ${slot.date} ${slot.time}
          面交地點: ${slot.location}
          (用戶請在這裡填入其他問題(不是給你gemeni填的))
          感謝您的抽空閱讀這封郵件，期待您的回覆。
          祝，學術順利`,
            },
          ],
        },
      ],
    };
  }

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

export async function openEmailClient(seller, products, user = null) {
  const emailTemplate = await generateEmailTemplate(seller, products, user);

  if (emailTemplate) {
    const subject = "商品詢問-NCU二手物交易網";
    const body = encodeURIComponent(emailTemplate);
    const mailtoLink = `mailto:${seller.email}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    window.location.href = mailtoLink;
  } else {
    console.error("Failed to generate email template.");
  }
}
