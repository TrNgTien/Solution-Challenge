import { Hashcode, HashcodeTypes } from "../../../interface/low-level/hashcode/hashcode-entity";
import { IHashcodeRepository } from "../../../interface/low-level/hashcode/hashcode-repository-interface";

import { IStringHelper } from "../../../interface/utils/helpers/helpers-interface";
import { TwoFactorWorkFlowInput, TwoFactorWorkFlowOutPut } from "./types";

export default class TwoFactorWorkflow {
    constructor(
        private stringHelper: IStringHelper,
        private hashcodeRepository: IHashcodeRepository
    ) { }

    public async execute(credential: TwoFactorWorkFlowInput): Promise<TwoFactorWorkFlowOutPut> {
        let randomCode: string = await this.stringHelper.genRandomString(64)

        const expiredIn: Date = new Date(new Date().getTime() + (1000 * 60 * 60 * 3))  //delta: 3 hours

        const verifyCode: Hashcode = new Hashcode({
            key: randomCode,
            userId: 1,
            type: HashcodeTypes.REGISTER_CODE,
            expiredIn: expiredIn,
            createdAt: new Date(),
            createdBy: -1,
            updatedAt: new Date(),
            updatedBy: -1,
        })
        console.log(verifyCode)

        const insertCode = await this.hashcodeRepository.create(verifyCode)

        

        return {message: insertCode}
    }
}