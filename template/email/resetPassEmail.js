
export default function resetPassEmailHTML(link) {

  return (
      `
      <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
      <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Забыли пароль?</title>
        <style type="text/css">
          html {
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
          }
        </style>
        <style em="styles">
      @media only screen and (max-device-width:660px),only screen and (max-width:660px) {
          .em-narrow-table {
              width: 100%!important;
              max-width: 660px!important;
              min-width: 320px!important;
          }
          .em-mob-wrap.em-mob-wrap-cancel,.noresp-em-mob-wrap.em-mob-wrap-cancel {
              display: table-cell!important;
          }
          .em-mob-width-100perc {
              width: 100%!important;
              max-width: 100%!important;
          }
          .em-mob-wrap {
              display: block!important;
          }
          .em-mob-width-auto {
              width: auto!important;
          }
          .em-mob-padding_bottom-10 {
              padding-bottom: 10px!important;
          }
          .em-mob-padding_top-20 {
              padding-top: 20px!important;
          }
          .em-mob-padding_right-20 {
              padding-right: 20px!important;
          }
          .em-mob-padding_bottom-20 {
              padding-bottom: 20px!important;
          }
          .em-mob-padding_left-20 {
              padding-left: 20px!important;
          }
          .em-mob-background_color-E5E5E5 {
              background-color: #e5e5e5!important;
          }
      }
      </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #F8F8F8;">
        <span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: #F8F8F8; height: 0; width: 0; font-size: 1px;">&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;</span>
        <!--[if !mso]><!-->
        <div style="font-size:0px;color:transparent;opacity:0;">⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</div>
        <!--<![endif]-->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 1px; line-height: normal;" bgcolor="#F8F8F8">
          <tr em="group">
            <td align="center" bgcolor="#F5F5F5" style="background-color: #f5f5f5; background-repeat: repeat;">
              <!--[if (gte mso 9)|(IE)]>
              <table cellpadding="0" cellspacing="0" border="0" width="660"><tr><td>
              <![endif]-->
              <table cellpadding="0" cellspacing="0" width="100%" border="0" style="max-width: 660px; min-width: 660px; width: 660px;" class="em-narrow-table">
                <tr em="block" class="em-structure">
                  <td align="center" style="padding: 30px 40px;" class="em-mob-padding_top-20 em-mob-padding_right-20 em-mob-padding_bottom-20 em-mob-padding_left-20 em-mob-background_color-E5E5E5">
                    <table border="0" cellspacing="0" cellpadding="0" class="em-mob-width-100perc">
                      <tr>
                        <td width="580" class="em-mob-wrap em-mob-wrap-cancel em-mob-width-auto">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom">
                            <tr>
                              <td align="center">
                                <img src="https://emcdn.ru/473291/240602_6656_7oLOgza.png" width="120" border="0" alt="" style="display: block; width: 100%; max-width: 120px;"><span class="em-element-resize-img" style="cursor: nwse-resize;"></span><span class="em-element-resize-img" style="cursor: nwse-resize;"></span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr em="block" class="em-structure">
                  <td align="center" style="padding: 30px 40px; background-color: #ffffff; background-repeat: repeat;" class="em-mob-padding_left-20 em-mob-padding_right-20" bgcolor="#fff">
                    <table border="0" cellspacing="0" cellpadding="0" class="em-mob-width-100perc">
                      <tr>
                        <td width="580" valign="top" class="em-mob-wrap em-mob-width-100perc">

                          <table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom">
                            <tr>
                              <td align="center">
                                <img src="https://emcdn.ru/278815/240412_4213_tAsWRx4.png" width="300" border="0" alt="" style="display: block; width: 100%; max-width: 300px;"><span class="em-element-resize-img" style="cursor: nwse-resize;"></span><div class="em-element-img-change" title="Сменить изображение"><svg viewbox="0 0 20 20" focusable="false" data-icon="bg-colors" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M3.75 17.5C3.41667 17.5 3.125 17.375 2.875 17.125C2.625 16.875 2.5 16.5833 2.5 16.25V3.75C2.5 3.41667 2.625 3.125 2.875 2.875C3.125 2.625 3.41667 2.5 3.75 2.5H16.25C16.5833 2.5 16.875 2.625 17.125 2.875C17.375 3.125 17.5 3.41667 17.5 3.75V16.25C17.5 16.5833 17.375 16.875 17.125 17.125C16.875 17.375 16.5833 17.5 16.25 17.5H3.75ZM3.75 16.25H16.25V3.75H3.75V16.25ZM4.91667 14.2292H15.1042L12.0417 10.1458L9.29167 13.7083L7.35417 11.0625L4.91667 14.2292Z"></path></svg></div><i class="em-element-img-edit"><i class="las la-pen"></i></i><i class="em-element-img-stock"><svg viewbox="0 0 12 12" focusable="false" data-icon="ai" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M4.12726 7.18183H9.6909L7.86364 4.76364L6.44545 6.63637L5.4909 5.49092L4.12726 7.18183ZM0.909082 11.3636C0.659082 11.3636 0.445068 11.2746 0.267041 11.0966C0.0890136 10.9186 0 10.7046 0 10.4546V2.99999H0.909082V10.4546H10.7273V11.3636H0.909082ZM2.72726 9.54546C2.47726 9.54546 2.26325 9.45644 2.08522 9.27842C1.90719 9.10039 1.81818 8.88638 1.81818 8.63638V1.90908C1.81818 1.65908 1.90719 1.44507 2.08522 1.26704C2.26325 1.08901 2.47726 1 2.72726 1H5.81817L6.90908 2.09091H11.0909C11.3409 2.09091 11.5549 2.17992 11.733 2.35795C11.911 2.53598 12 2.74999 12 2.99999V8.63638C12 8.88638 11.911 9.10039 11.733 9.27842C11.5549 9.45644 11.3409 9.54546 11.0909 9.54546H2.72726ZM2.72726 8.63638H11.0909V2.99999H6.53182L5.44091 1.90908H2.72726V8.63638Z"></path></svg></i><i class="em-element-img-changeto"><i class="las la-sync-alt"></i></i><i class="em-element-img-gif"><svg viewbox="0 0 12 12" focusable="false" data-icon="ai" width="1em" height="1em" fill="currentColor" aria-hidden="true">&lt;<path d="M5.68571 8.14286V3H6.79999V8.14286H5.68571ZM0.771429 8.14286C0.54 8.14286 0.353571 8.06786 0.212143 7.91786C0.0707142 7.76786 0 7.58571 0 7.37143V3.77143C0 3.55714 0.0707142 3.375 0.212143 3.225C0.353571 3.075 0.54 3 0.771429 3H3.40001C3.63144 3 3.81786 3.075 3.95929 3.225C4.10072 3.375 4.17144 3.55714 4.17144 3.77143V4.11429H1.11429V7.02857H3.05715V5.57143H4.17144V7.37143C4.17144 7.58571 4.10072 7.76786 3.95929 7.91786C3.81786 8.06786 3.63144 8.14286 3.40001 8.14286H0.771429ZM8.25714 8.14286V3H12V4.11429H9.37142V5.25714H11.1V6.37142H9.37142V8.14286H8.25714Z"></path></svg></i><i class="em-element-img-ai"><svg viewbox="0 0 12 12" focusable="false" data-icon="ai" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M2.45454 11.7273C2.45454 11.7273 2.16994 10.446 1.66154 9.88113C1.15314 9.31625 0 9 0 9C0 9 1.15314 8.68374 1.66154 8.11887C2.16994 7.554 2.45454 6.27273 2.45454 6.27273C2.45454 6.27273 2.73915 7.554 3.24755 8.11887C3.75594 8.68374 4.90909 9 4.90909 9C4.90909 9 3.75594 9.31625 3.24755 9.88113C2.73915 10.446 2.45454 11.7273 2.45454 11.7273Z"></path><path d="M7.63636 9C7.63636 9 7.1304 6.94996 6.22658 6.04614C5.32276 5.14233 3.27273 4.63636 3.27273 4.63636C3.27273 4.63636 5.32276 4.1304 6.22658 3.22657C7.1304 2.32275 7.63636 0.272728 7.63636 0.272728C7.63636 0.272728 8.14233 2.32275 9.04615 3.22657C9.94996 4.1304 12 4.63636 12 4.63636C12 4.63636 9.94996 5.14233 9.04615 6.04614C8.14233 6.94996 7.63636 9 7.63636 9Z"></path><path d="M1.63636 4.09091C1.63636 4.09091 1.44663 3.19402 1.10769 2.7986C0.768758 2.40318 0 2.18182 0 2.18182C0 2.18182 0.768758 1.96046 1.10769 1.56503C1.44663 1.16961 1.63636 0.272728 1.63636 0.272728C1.63636 0.272728 1.8261 1.16961 2.16503 1.56503C2.50397 1.96046 3.27273 2.18182 3.27273 2.18182C3.27273 2.18182 2.50397 2.40318 2.16503 2.7986C1.8261 3.19402 1.63636 4.09091 1.63636 4.09091Z"></path><path d="M10.6364 11.7273C10.6364 11.7273 10.4782 11.0866 10.1958 10.8042C9.91336 10.5218 9.27273 10.3636 9.27273 10.3636C9.27273 10.3636 9.91336 10.2055 10.1958 9.92307C10.4782 9.64064 10.6364 9 10.6364 9C10.6364 9 10.7945 9.64064 11.0769 9.92307C11.3594 10.2055 12 10.3636 12 10.3636C12 10.3636 11.3594 10.5218 11.0769 10.8042C10.7945 11.0866 10.6364 11.7273 10.6364 11.7273Z"></path></svg></i><span class="em-element-resize-img" style="cursor: nwse-resize;"></span><div class="em-element-img-change" title="Сменить изображение"><svg viewbox="0 0 20 20" focusable="false" data-icon="bg-colors" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M3.75 17.5C3.41667 17.5 3.125 17.375 2.875 17.125C2.625 16.875 2.5 16.5833 2.5 16.25V3.75C2.5 3.41667 2.625 3.125 2.875 2.875C3.125 2.625 3.41667 2.5 3.75 2.5H16.25C16.5833 2.5 16.875 2.625 17.125 2.875C17.375 3.125 17.5 3.41667 17.5 3.75V16.25C17.5 16.5833 17.375 16.875 17.125 17.125C16.875 17.375 16.5833 17.5 16.25 17.5H3.75ZM3.75 16.25H16.25V3.75H3.75V16.25ZM4.91667 14.2292H15.1042L12.0417 10.1458L9.29167 13.7083L7.35417 11.0625L4.91667 14.2292Z"></path></svg></div><i class="em-element-img-edit"><i class="las la-pen"></i></i><i class="em-element-img-stock"><svg viewbox="0 0 12 12" focusable="false" data-icon="ai" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M4.12726 7.18183H9.6909L7.86364 4.76364L6.44545 6.63637L5.4909 5.49092L4.12726 7.18183ZM0.909082 11.3636C0.659082 11.3636 0.445068 11.2746 0.267041 11.0966C0.0890136 10.9186 0 10.7046 0 10.4546V2.99999H0.909082V10.4546H10.7273V11.3636H0.909082ZM2.72726 9.54546C2.47726 9.54546 2.26325 9.45644 2.08522 9.27842C1.90719 9.10039 1.81818 8.88638 1.81818 8.63638V1.90908C1.81818 1.65908 1.90719 1.44507 2.08522 1.26704C2.26325 1.08901 2.47726 1 2.72726 1H5.81817L6.90908 2.09091H11.0909C11.3409 2.09091 11.5549 2.17992 11.733 2.35795C11.911 2.53598 12 2.74999 12 2.99999V8.63638C12 8.88638 11.911 9.10039 11.733 9.27842C11.5549 9.45644 11.3409 9.54546 11.0909 9.54546H2.72726ZM2.72726 8.63638H11.0909V2.99999H6.53182L5.44091 1.90908H2.72726V8.63638Z"></path></svg></i><i class="em-element-img-changeto"><i class="las la-sync-alt"></i></i><i class="em-element-img-gif"><svg viewbox="0 0 12 12" focusable="false" data-icon="ai" width="1em" height="1em" fill="currentColor" aria-hidden="true">&lt;<path d="M5.68571 8.14286V3H6.79999V8.14286H5.68571ZM0.771429 8.14286C0.54 8.14286 0.353571 8.06786 0.212143 7.91786C0.0707142 7.76786 0 7.58571 0 7.37143V3.77143C0 3.55714 0.0707142 3.375 0.212143 3.225C0.353571 3.075 0.54 3 0.771429 3H3.40001C3.63144 3 3.81786 3.075 3.95929 3.225C4.10072 3.375 4.17144 3.55714 4.17144 3.77143V4.11429H1.11429V7.02857H3.05715V5.57143H4.17144V7.37143C4.17144 7.58571 4.10072 7.76786 3.95929 7.91786C3.81786 8.06786 3.63144 8.14286 3.40001 8.14286H0.771429ZM8.25714 8.14286V3H12V4.11429H9.37142V5.25714H11.1V6.37142H9.37142V8.14286H8.25714Z"></path></svg></i><i class="em-element-img-ai"><svg viewbox="0 0 12 12" focusable="false" data-icon="ai" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M2.45454 11.7273C2.45454 11.7273 2.16994 10.446 1.66154 9.88113C1.15314 9.31625 0 9 0 9C0 9 1.15314 8.68374 1.66154 8.11887C2.16994 7.554 2.45454 6.27273 2.45454 6.27273C2.45454 6.27273 2.73915 7.554 3.24755 8.11887C3.75594 8.68374 4.90909 9 4.90909 9C4.90909 9 3.75594 9.31625 3.24755 9.88113C2.73915 10.446 2.45454 11.7273 2.45454 11.7273Z"></path><path d="M7.63636 9C7.63636 9 7.1304 6.94996 6.22658 6.04614C5.32276 5.14233 3.27273 4.63636 3.27273 4.63636C3.27273 4.63636 5.32276 4.1304 6.22658 3.22657C7.1304 2.32275 7.63636 0.272728 7.63636 0.272728C7.63636 0.272728 8.14233 2.32275 9.04615 3.22657C9.94996 4.1304 12 4.63636 12 4.63636C12 4.63636 9.94996 5.14233 9.04615 6.04614C8.14233 6.94996 7.63636 9 7.63636 9Z"></path><path d="M1.63636 4.09091C1.63636 4.09091 1.44663 3.19402 1.10769 2.7986C0.768758 2.40318 0 2.18182 0 2.18182C0 2.18182 0.768758 1.96046 1.10769 1.56503C1.44663 1.16961 1.63636 0.272728 1.63636 0.272728C1.63636 0.272728 1.8261 1.16961 2.16503 1.56503C2.50397 1.96046 3.27273 2.18182 3.27273 2.18182C3.27273 2.18182 2.50397 2.40318 2.16503 2.7986C1.8261 3.19402 1.63636 4.09091 1.63636 4.09091Z"></path><path d="M10.6364 11.7273C10.6364 11.7273 10.4782 11.0866 10.1958 10.8042C9.91336 10.5218 9.27273 10.3636 9.27273 10.3636C9.27273 10.3636 9.91336 10.2055 10.1958 9.92307C10.4782 9.64064 10.6364 9 10.6364 9C10.6364 9 10.7945 9.64064 11.0769 9.92307C11.3594 10.2055 12 10.3636 12 10.3636C12 10.3636 11.3594 10.5218 11.0769 10.8042C10.7945 11.0866 10.6364 11.7273 10.6364 11.7273Z"></path></svg></i>
                              </td>
                            </tr>
                          </table>
                          <table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom">
                            <tr>
                              <td style="padding: 20px 0 10px;">
                                <div style="font-family: 'Arial Black', Gadget, sans-serif; font-size: 32px; line-height: 43px; color: #333333;" align="center"><strong>ЗАБЫЛИ<br>СВОЙ ПАРОЛЬ?&nbsp;</strong></div>
                              </td>
                            </tr>
                          </table>
                          <table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom">
                            <tr>
                              <td style="padding-bottom: 10px;">
                                <div style="font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; font-size: 16px; line-height: 21px; color: #5a5a5a;" align="center">Не беспокойтесь, мы вам поможем! <br>Давайте установим новый пароль.<br></div>
                              </td>
                            </tr>
                          </table>
                          <table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom">
                            <tr>
                              <td style="padding: 20px 0px 10px;" align="center">
                                <table cellpadding="0" cellspacing="0" border="0" width="250" style="width: 250px;">
                                  <tr>
                                    <td align="center" valign="middle" height="50" style="background-color: #f77452; border-radius: 100px; height: 50px;" bgcolor="#F77452">
                                      <a href="${link}" target="_blank" style="display: block; height: 50px; font-family: 'Arial Black', Gadget, sans-serif; color: #ffffff; font-size: 14px; line-height: 50px; text-decoration: none; white-space: nowrap;">СБРОСИТЬ ПАРОЛЬ</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>


                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr em="block" class="em-structure">
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom"><tr><td height="20"><div class="em-element-vindent-bg"></div></td></tr></table>
                  </td>
                </tr>
                <tr em="block" class="em-structure">
                  <td align="center" style="padding: 20px 40px; background-color: #ffffff; background-repeat: repeat;" class="em-mob-padding_left-20 em-mob-padding_right-20" bgcolor="#fff">
                    <table border="0" cellspacing="0" cellpadding="0" class="em-mob-width-100perc">
                      <tr>
                        <td width="580" valign="top" class="em-mob-wrap em-mob-width-100perc">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom">
                            <tr>
                              <td style="padding-right: 0px; padding-bottom: 10px; padding-left: 0px;">
                                <div style="font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; font-size: 18px; line-height: 28px; color: #333333;"><strong>Ссылка действительна 2 часа</strong></div>
                              </td>
                            </tr>
                          </table>
                          <table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom">
                            <tr>
                              <td style="padding-bottom: 10px;">
                                <div style="font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; font-size: 16px; line-height: 21px; color: #5a5a5a;">Если вы не запрашивали сброс пароля или получили это сообщение <br>по ошибке, не обращайте внимания на это письмо.</div>
                              </td>
                            </tr>
                          </table>

                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr em="block" class="em-structure">
                  <td align="center" style="padding: 30px 40px;" class="em-mob-padding_top-20 em-mob-padding_right-20 em-mob-padding_bottom-10 em-mob-padding_left-20">
                    <table border="0" cellspacing="0" cellpadding="0" class="em-mob-width-100perc">
                      <tr>
                        <td width="280" valign="top" class="em-mob-wrap em-mob-width-100perc">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom">
                            <tr>
                              <td style="padding-bottom: 20px;">
                                <img src="https://emcdn.ru/473291/240602_6656_GTzqeez.png" width="130" border="0" alt="" style="display: inline-block; width: 100%; max-width: 130px;"><span class="em-element-resize-img" style="cursor: nwse-resize;"></span><span class="em-element-resize-img" style="cursor: nwse-resize;"></span>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td width="20" class="em-mob-wrap">&nbsp;</td>
                        <td width="280" valign="top" class="em-mob-wrap em-mob-width-100perc" align="right"><table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom"><tr><td style="padding-bottom: 10px;">
        <div style="font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; font-size: 16px; line-height: 21px; color: #5a5a5a;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; © 2024 Korobka&nbsp;</div>
      </td></tr></table></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td></tr></table>
              <![endif]-->
            </td>
          </tr>
        </table>
      </body>
      </html>
      `
  )
}
