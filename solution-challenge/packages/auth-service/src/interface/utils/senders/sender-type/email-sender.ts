import { ISender } from "../interface";
import * as nodemailer from 'nodemailer'
import { MailServerOptions } from "../../../../bounded-context/type";
import path from 'path'

// tslint:disable-next-line: no-var-requires
const hbs = require('nodemailer-express-handlebars')

export default class EmailSender implements ISender {
    private tranporter: MailServerOptions
    private data: any

    constructor(data: any) {

        this.data = data

        this.tranporter = {
            host: `smtp.gmail.com`,
            port: 465,
            auth: {
                user: 'testvinamr123@gmail.com',
                pass: 'qvniptytcyjprzwe'
            }
        }

    }

    public async validate(): Promise<boolean> {
        ['address', 'subject', 'template'].forEach(key => {
            if(!this.data[key]) {
                throw Error(`Data missing field ${key}`)
            }
            if(key === 'template') {
                ['hbs'].forEach(type => {
                    if(!this.data.template[type]) throw Error(`Wrong input template ${type}`)
                })
            }
        })
        
        return true
    }

    public async setContent(): Promise<any> {
        
        await this.validate()

        console.log(`data in email sender`, this.data)

        const content = {
            from: this.tranporter.auth.user,
            to: this.data.address,
            subject: this.data.subject,
            template: this.data.template.hbs,
            context: this.data.attributes
        }

        return content
    }

    public async execute(): Promise<void> {
        const hbsConfig = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: path.join(process.cwd(), '/templates/'),
                layoutsDir: path.join(process.cwd(), '/templates/'),
                defaultLayout: ''
            },
            viewPath: path.join(process.cwd(), '/templates/'),
            extName: '.hbs'
        }

        const transporter = nodemailer.createTransport(this.tranporter)
        transporter.use('compile', hbs(hbsConfig))

        let emailContent = await this.setContent()

        let result: any
        try {
            result = await transporter.sendMail(emailContent)
        }
        catch (error) {
            console.log(`error here`)
            throw error
        }

        console.log(`message Sent successfully.`)
    }
}