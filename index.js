const {chromium}= require('playwright');


(async () =>{
    

    
    const browser = await chromium.launch({headless : false});

    const context = await browser.newContext(/*{recordVideo:{dir: './videos'}}*/);
    const page = await context.newPage();

    await page.goto('https://scrapepark.org/spanish/'); 

    await page.getByRole('link', { name: 'Productos', exact: true }).click();
    await page.waitForTimeout(1000);
    await page.waitForSelector('.product-section .container .row');


    const links = await page.evaluate(() => {

        const items = document.querySelectorAll('.col-sm-6 .box div.detail-box');

        const links = [];
        
        for (let item of items){
            const h5 = item.querySelector('h5');
            const h6 = item.querySelector('h6');
            if (h5) links.push(h5.innerText);
            if (h6) links.push(h6.innerText);
        }
        return links;

    });

    console.log(links);

    await context.close();
    await browser.close();


})();