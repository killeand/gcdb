import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import faker from 'faker';

export default class SecretManager {
    static Secret = null;
    Get() {
        if (!_.isNil(this.Secret))
            return this.Secret;

        if (fs.existsSync(path.resolve("./secret.key"))) {
            let secret_string = fs.readFileSync(path.resolve("./secret.key"));

            if (!_.isEmpty(secret_string)) {
                this.Secret = secret_string;
                return this.Secret;
            }
            else {
                this.Secret = this.Gen();
                this.Save();
                return this.Secret;
            }
        }
        else {
            this.Secret = this.Gen();
            this.Save();
            return this.Secret;
        }
    }
    Save() {
        if (_.isNil(this.Secret))
            this.Secret = this.Gen();
            
        fs.writeFileSync(path.resolve("./secret.key"), this.Secret);
    }
    Gen() {
        return Buffer.from(faker.random.alphaNumeric(128)).toString("base64url");
    }
}

