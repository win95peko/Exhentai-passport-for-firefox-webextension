async function modifyCookie(message, sender, sendResponse) {
    let pass_hash = null;
    let member_id = null;

    for (let name of ["ipb_member_id", "ipb_pass_hash", "yay"]) {
        await browser.cookies.remove({
            url: server.ex,
            name: name,
            firstPartyDomain: "exhentai.org"
        });
    }

    pass_hash = await browser.cookies.get({
        url: server.forums,
        name: "ipb_pass_hash",
        firstPartyDomain: "forums.e-hentai.org"
    });
    member_id = await browser.cookies.get({
        url: server.forums,
        name: "ipb_member_id",
        firstPartyDomain: "forums.e-hentai.org"
    });

    if (pass_hash && member_id) {
        if (pass_hash.value === "0" || member_id.value === "0") {
            return { success: false, msg: "Cookie is not valid, please log in again" };
        } else {
            pass_hash.url = server.ex;
            pass_hash.domain = ".exhentai.org";
            pass_hash.hostOnly = false;
            pass_hash.session = false;
            pass_hash.firstPartyDomain = "exhentai.org";
            await browser.cookies.set(pass_hash);

            member_id.url = server.ex;
            member_id.domain = ".exhentai.org";
            member_id.hostOnly = false;
            member_id.session = false;
            member_id.firstPartyDomain = "exhentai.org";
            await browser.cookies.set(member_id);

            return { success: true, msg: "success" };
        }
    } else {
        return { success: false, msg: "No proper cookies found, please clear cookies and log in again" };
    }
}
