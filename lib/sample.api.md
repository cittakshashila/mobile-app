```js
const app = require('express')()
const PORT = 3000

const repoOwner = 'cittakshashila'
const repoName = 'test'
const githubToken = process.env.TOKEN

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.put('/:event', async (req, res) => {
    const { event } = req.params
    const N = req.query.new == 'true'
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${event}/info.json`

    if (!N) {
        // get sha
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${githubToken}`,
            },
        });

        if (!response.ok) return res.send(`Failed to fetch current file content: ${response.statusText}`).status(404)

        const currentFileData = await response.json()

        // Updating file
        const updatedFileContent = {
            ...currentFileData,
            message: `Updating ${event}`,
            content: Buffer.from(JSON.stringify(req.body, null, 2)).toString('base64'),
        };

        const updateResponse = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${githubToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFileContent),
        });

        if (!updateResponse.ok) return res.send(`Failed to delete event: ${updateResponse.statusText}`).status(500);

        return res.json(updateResponse)

    } else {

        // Creating file
        const createdFileContent = {
            message: `Updating ${event}`,
            content: Buffer.from(JSON.stringify(req.body, null, 2)).toString('base64'),
        };

        const creationResponse = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${githubToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createdFileContent),
        });

        if (!creationResponse.ok) return res.send(`Failed to delete event: ${creationResponse.statusText}`).status(500);

        return res.json(creationResponse)

    }
})

app.delete('/:event', async (req, res) => {
    const { event } = req.params
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${event}/info.json`

    // get sha
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${githubToken}`,
        },
    });

    if (!response.ok) {
        return res.send(`Failed to fetch current file content: ${response.statusText}`).status(404)
    }

    const currentFileData = await response.json()

    // DELETING EVENT
    const updatedFileContent = {
        ...currentFileData,
        message: `Deleting ${event}`,
    };

    const deleteRespsone = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${githubToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFileContent),
    });

    if (!deleteRespsone.ok) return res.send(`Failed to delete event: ${deleteRespsone.statusText}`).status(500);

    return res.json(deleteRespsone)
})

app.listen(PORT, () => console.log(`SERVER LISTENING ON PORT ${PORT}`))
```
