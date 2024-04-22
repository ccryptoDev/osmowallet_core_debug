import { formatAmount } from "src/common/utils/amount-formatter.util";
import { EmailAttachmentStructure, EmailContentStructure, EmailFromStructure, EmailToStructure, SendgridTemplate } from "../sendgridBase.template";
import { WithdrawalDataEmail } from "./withdrawalData";
import { formatName } from "src/common/utils/name-formatter.util";




/*
    This class send email transaction funding in Pending to the user extending of base class
 */
export class WithdrawalPendingTemplate extends SendgridTemplate{

    /// This template in html format will be displayed in the email
    template: string = `
    <!DOCTYPE html><html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en"><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><link 
    href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]--><style>
    *{box-sizing:border-box}body{margin:0;padding:0}a[x-apple-data-detectors]{color:inherit!important;text-decoration:inherit!important}#MessageViewBody a{color:inherit;text-decoration:none}p{line-height:inherit}.desktop_hide,.desktop_hide table{mso-hide:all;display:none;max-height:0;overflow:hidden}.image_block img+div{display:none} @media (max-width:670px){.social_block.desktop_hide .social-table{display:inline-block!important}.image_block div.fullWidth{max-width:100%!important}.mobile_hide{display:none}.row-content{width:100%!important}.stack .column{width:100%;display:block}.mobile_hide{min-height:0;max-height:0;max-width:0;overflow:hidden;font-size:0}.desktop_hide,.desktop_hide table{display:table!important;max-height:none!important}.row-2 .column-1 .block-3.button_block td.pad{padding:10px 0 5px!important}.row-2 .column-1 .block-3.button_block a,.row-2 .column-1 .block-3.button_block div,.row-2 .column-1 .block-3.button_block span{line-height:28px!important}.row-2 .column-1 .block-2.text_block td.pad{padding:20px 30px 0 25px!important}.row-5 .column-2 .block-1.social_block td.pad{padding:15px 5px 0 30px!important}.row-5 .column-1 .block-2.text_block td.pad{padding:0 0 0 35px!important}.row-5 .column-1 .block-1.image_block td.pad{padding:0 0 0 5px!important}}
    </style></head><body style="background-color:#e3e2e2;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none"><table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#e3e2e2"><tbody><tr><td><table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" 
    style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;background-size:auto"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-size:auto;background-color:#fff;border-radius:0;color:#000;width:650px;margin:0 auto" width="650"><tbody><tr><td class="column column-1" width="100%" 
    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><div class="spacer_block block-1" style="height:25px;line-height:25px;font-size:1px"> </div><table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td class="pad" style="width:100%;padding-right:0;padding-left:0"><div 
    class="alignment" align="center" style="line-height:10px"><div style="max-width:227.5px"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/f7683d20-2948-460f-8f91-a13fe519b593/8S7TDHZ1MY25VT9O0AEWVQUF/1_2.png" style="display:block;height:auto;border:0;width:100%" width="227.5"></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" 
    style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;border-radius:0;color:#000;width:650px;margin:0 auto" width="650"><tbody><tr><td class="column column-1" width="100%" 
    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td class="pad" style="padding-left:50px;width:100%;padding-right:0"><div class="alignment" align="center" style="line-height:10px"><div 
    class="fullWidth" style="max-width:585px"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/f7683d20-2948-460f-8f91-a13fe519b593/8S7TDHZ1MY25VT9O0AEWVQUF/taman%CC%83os%20mail_7.png" style="display:block;height:auto;border:0;width:100%" width="585"></div></div></td></tr></table><table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad" 
    style="padding-bottom:20px;padding-left:50px;padding-right:50px"><div style="font-family:sans-serif"><div class style="font-size:14px;font-family:Figtree,sans-serif;mso-line-height-alt:16.8px;color:#0f0101;line-height:1.2"><p style="margin:0;font-size:17px;text-align:center;mso-line-height-alt:20.4px;letter-spacing:normal"><span style="font-size:42px;color:#5220a3;"><strong>Q50</strong></span></p></div></div></td></tr></table><table class="button_block block-3" width="100%" border="0" 
    cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td class="pad" style="padding-bottom:5px;padding-top:5px;text-align:center"><div class="alignment" align="center"><!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://osmowallet.page.link/open-app" style="height:38px;width:123px;v-text-anchor:middle;" arcsize="11%" stroke="false" fillcolor="#6f01b4">
    <w:anchorlock/>
    <v:textbox inset="0px,0px,0px,0px">
    <center style="color:#ffffff; font-family:Arial, sans-serif; font-size:14px">
    <![endif]-->
    <a href="https://osmowallet.page.link/open-app" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#6f01b4;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:15px;padding-right:15px;font-size:14px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 28px;"><strong>Abre tu Wallet</strong></span></span></a>
    <!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div></td></tr></table><table class="divider_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td class="pad"><div class="alignment" align="center"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td class="divider_inner" 
    style="font-size:1px;line-height:1px;border-top:1px solid #bbb"><span> </span></td></tr></table></div></td></tr></table><table class="text_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad" style="padding-bottom:10px;padding-left:45px;padding-right:10px;padding-top:10px"><div style="font-family:sans-serif"><div class 
    style="font-size:14px;font-family:Figtree,sans-serif;mso-line-height-alt:16.8px;color:#555;line-height:1.2"><p style="margin:0;font-size:16px;mso-line-height-alt:19.2px">Hola ${formatName(this.to[0]?.name ?? '')},<br><br>Has retirado ${this.withdrawalDataEmail.currency}${formatAmount(this.withdrawalDataEmail.amount)} a tu cuenta de banco. Puedes encontrar los detalles a continuación:</p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" 
    style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#e3e2e2;color:#000;border-radius:19px;width:650px;margin:0 auto" width="650"><tbody><tr><td class="column column-1" width="100%" 
    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="text_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad" style="padding-bottom:10px;padding-left:45px;padding-top:10px"><div style="font-family:sans-serif"><div class 
    style="font-size:14px;font-family:Figtree,sans-serif;mso-line-height-alt:16.8px;color:#555;line-height:1.2"><p style="margin:0;font-size:14px;mso-line-height-alt:16.8px"><span style="color:#000000;font-size:14px;"><span style="color:#4e4d4d;">Nota:</span> ${this.withdrawalDataEmail.note ??= '-'}</span></p><p style="margin:0;font-size:14px;mso-line-height-alt:16.8px"><br><span style="color:#000000;font-size:14px;"><span style="color:#4e4d4d;">Monto:</span> Q50</span></p><p 
    style="margin:0;font-size:14px;mso-line-height-alt:16.8px"><br><span style="color:#4e4d4d;font-size:14px;">ID de transacción: <span style="color:#000000;">${this.withdrawalDataEmail.transactionId}</span></span></p><p style="margin:0;font-size:14px;mso-line-height-alt:16.8px"> </p><p style="margin:0;font-size:14px;mso-line-height-alt:16.8px"><span style="color:#4e4d4d;font-size:14px;">Fecha: <span style="color:#000000;">${this.withdrawalDataEmail.date}</span></span></p><p style="margin:0;font-size:14px;mso-line-height-alt:16.8px">
     </p><p style="margin:0;font-size:14px;mso-line-height-alt:16.8px"><span style="color:#4e4d4d;font-size:14px;">Estado: ${this.withdrawalDataEmail.status}</span></p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" 
    cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;border-radius:0;color:#000;width:650px;margin:0 auto" width="650"><tbody><tr><td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="text_block block-1" width="100%" border="0" cellpadding="0" 
    cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad" style="padding-bottom:10px;padding-left:45px;padding-right:10px"><div style="font-family:sans-serif"><div class style="font-size:14px;font-family:Figtree,sans-serif;mso-line-height-alt:16.8px;color:#555;line-height:1.2"><p style="margin:0;font-size:15px;mso-line-height-alt:18px">
    <span style="font-size:11px;">Tu Retiro está en proceso. Esto puede tomar entre 24 y 48 horas hábiles.</span></p><p style="margin:0;font-size:15px;mso-line-height-alt:16.8px"> </p><p style="margin:0;font-size:15px;mso-line-height-alt:18px"><span style="font-size:14px;"><span style>Si no reconoces esta transacción, ponte en contacto con nosotros inmediatamente. Nuestro equipo de asistencia está disponible a través </span><span style>del chat de la aplicación.</span></span></p><p 
    style="margin:0;font-size:15px;mso-line-height-alt:16.8px"> </p><p style="margin:0;font-size:15px;mso-line-height-alt:18px"><span style="color:#000000;font-size:16px;">Equipo <strong>Osmo</strong>✌</span></p><p style="margin:0;font-size:15px;mso-line-height-alt:16.8px"> </p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" 
    style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#e3e2e2;color:#000;width:650px;margin:0 auto" width="650"><tbody><tr><td class="column column-1" width="50%" 
    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-top:15px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td class="pad" style="padding-left:45px;width:100%;padding-right:0"><div class="alignment" align="left" style="line-height:10px"><div style="max-width:81.25px">
    <a href="http://example.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/f7683d20-2948-460f-8f91-a13fe519b593/8S7TDHZ1MY25VT9O0AEWVQUF/osmo-mailing-violet-14.png" style="display:block;height:auto;border:0;width:100%" width="81.25" alt="Osmo" title="Osmo"></a></div></div></td></tr></table><table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" 
    role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad" style="padding-bottom:15px;padding-left:45px"><div style="font-family:sans-serif"><div class style="font-size:14px;font-family:Figtree,sans-serif;mso-line-height-alt:16.8px;color:#393d47;line-height:1.2"><p style="margin:0;font-size:14px;text-align:left;mso-line-height-alt:16.8px"><span style="color:#4e4d4d;font-size:11px;">Bitcoin de la forma más fácil.</span></p></div></div></td></tr>
    </table></td><td class="column column-2" width="50%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="social_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td class="pad" style="padding-left:5px;padding-right:5px;padding-top:15px;text-align:left">
    <div class="alignment" align="left"><table class="social-table" width="144px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;display:inline-block"><tr><td style="padding:0 4px 0 0"><a href="https://www.facebook.com/osmoenvios/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/facebook@2x.png" width="32" height="32" alt="Facebook" title="facebook" 
    style="display:block;height:auto;border:0"></a></td><td style="padding:0 4px 0 0"><a href="https://twitter.com/osmowallet" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/twitter@2x.png" width="32" height="32" alt="Twitter" title="twitter" style="display:block;height:auto;border:0"></a></td><td style="padding:0 4px 0 0"><a href="https://www.instagram.com/osmowallet/" target="_blank"><img 
    src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/instagram@2x.png" width="32" height="32" alt="Instagram" title="instagram" style="display:block;height:auto;border:0"></a></td><td style="padding:0 4px 0 0"><a href="https://www.tiktok.com/@osmowallet?lang=en" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/tiktok@2x.png" width="32" height="32" alt="TikTok" 
    title="TikTok" style="display:block;height:auto;border:0"></a></td></tr></table></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!-- End --></body></html>
    `;
    constructor(
        to: Array<EmailToStructure>,
        private withdrawalDataEmail: WithdrawalDataEmail,
        attachments?: Array<EmailAttachmentStructure>,
        ){
        super(to,attachments)
        const emailContent = new EmailContentStructure()
        this.from = new EmailFromStructure()
        this.subject = `Retiro por ${formatAmount(this.withdrawalDataEmail.amount)} ${this.withdrawalDataEmail.currency} desde tu cuenta Osmo`
        emailContent.value = this.template
        this.content = [emailContent]        
    }
}