
import base from "./base";
import inputValid from "./inputValid";
import notificationsMessage from "./notifications/message";
import notificationsServerMessage from "./notifications/server_message";
import button from "./component/button";
import select from "./component/select";
import confirm from "./component/confirm";
import empty from "./component/empty";
import footer from "./component/footer";
import header from "./component/header";
import input from "./component/input";
import modal from "./component/modal";
import search from "./component/search";
import pageAdd from "./page/add";
import pageCatalog from "./page/catalog";
import pageCatalogId from "./page/catalogId";
import pageContact from "./page/contact";
import pageMain from "./page/main";
import pageUserMain from "./page/user/main";
import pageAdminTooltip from "./page/admin/tooltip";
import pageMeta from "./page/meta";

export default {
    ...base,
    ...inputValid,
    ...notificationsMessage,
    ...notificationsServerMessage,
    ...button,
    ...select,
    ...confirm,
    ...empty,
    ...footer,
    ...header,
    ...input,
    ...modal,
    ...search,
    ...pageAdd,
    ...pageCatalog,
    ...pageCatalogId,
    ...pageContact,
    ...pageMain,
    ...pageUserMain,
    ...pageAdminTooltip,
    ...pageMeta
};
