import request from "supertest"
import server from '../../server';   
import { connectionDB } from "../../server";
import db from "../../config/db";
jest.mock("../../config/db")



describe('mi primer prueba de ts',()=>{
    it('1+1 must give 2', ()=>{
        expect(1+1).toBe(2)
        expect(1+1).not.toBe(3)
    }
    )
})

// describe('Get / api', ()=>{
//     it('should send back a json response',async ()=>{
//         const res = await request(server).get('/api/products')
//         expect(res.status).toBe(200)
//         expect(res.header['content-type']).toMatch(/json/)
//         //contrarias
//         expect(res.status).not.toBe(400)
//     })
// })

describe("Connect to database", ()=>{
    it("Should handle database connection error", async () =>{

        //fuerza el error 
        jest.spyOn(db, 'authenticate')
        .mockRejectedValueOnce(new Error("Hubo un error al conectar"))


        const consoleSpy = jest.spyOn(console, 'log')
        await connectionDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Hubo un error al conectar")
        )
    })
})