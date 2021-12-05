import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import faker from 'faker';

export default class SecretManager {
    static FileUrl = null;
    static RawJSON = null;
    static Secret = null;
    static Expires = null;

    constructor() {
        if (_.isNil(this.FileUrl))
            this.FileUrl = "./secret.json";

        let filedata = null;

        if (_.isNil(this.RawJSON)) {
            if (fs.existsSync(path.resolve(this.FileUrl))) {
                try {
                    filedata = fs.readFileSync(path.resolve(this.FileUrl));

                    this.RawJSON = JSON.parse(filedata);
                    this.Secret = this.RawJSON.secret;
                    this.Expires = this.RawJSON.expires;
                }
                catch (error) {
                    this.Regenerate();
                }
            }
            else {
                this.Regenerate();
            }
        }
    }

    Check() {
        if (_.isNil(this.RawJSON)) {
            this.Regenerate();
        }
        else {
            if (this.Expires < Date.now()) {
                this.Regenerate();
            }
        }
    }

    Regenerate() {
        let newkey = Buffer.from(faker.random.alphaNumeric(128)).toString("base64url");

        this.RawJSON = {
            secret: newkey,
            expires: Date.now() + (30 * 24 * 60 * 60 * 1000)
        }

        this.Secret = this.RawJSON.secret;
        this.Expires = this.RawJSON.expires;

        this.Save();
    }
    
    Save() {
        fs.writeFileSync(path.resolve(this.FileUrl), JSON.stringify(this.RawJSON, null, '\t'));
    }
}

