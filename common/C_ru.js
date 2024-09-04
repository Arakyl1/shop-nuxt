
import { default as base } from "./base";
import { default as inputValid } from "./inputValid";
import { default as notificationsMessage } from "./notifications/message";
import { default as notificationsServerMessage } from "./notifications/server_message";
import { default as button } from "./component/button";
import { default as select } from "./component/select";
import { default as confirm } from "./component/confirm";
import { default as empty } from "./component/empty";
import { default as footer } from "./component/footer";
import { default as header } from "./component/header";
import { default as input } from "./component/input";
import { default as modal } from "./component/modal";
import { default as search } from "./component/search";
import { default as pageAdd } from "./page/add";
import { default as pageCatalog } from "./page/catalog";
import { default as pageCatalogId } from "./page/catalogId";
import { default as pageContact } from "./page/contact";
import { default as pageMain } from "./page/main";
import { default as pageUserMain } from "./page/user/main";
import { default as pageAdminTooltip } from "./page/admin/tooltip";
import { default as pageMeta } from "./page/meta";

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
