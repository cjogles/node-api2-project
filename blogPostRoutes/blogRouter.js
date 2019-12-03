const db = require('../data/db');
const express = require('express');
const router = express.Router();
router.use(express.json());

// GET /api/posts Returns an array of all the post objects contained in the database.         
       
router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({error: 'Error retrieving posts'})
        })
})

// GET /api/posts/:id Returns the post object with the specified id.         
        
router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).json({error: 'The post with the specified ID does not exist.'})
    } else {
        db.findById(id)
            .then(post => {
                res.status(200).json(post);
            })
            .catch(error => {
                res.status(500).json({error: 'The post information could not be retrieved'})
            })
    }
})

// GET /api/posts/:id/comments  Returns an array of all the comment objects associated with the post with the specified id.   
     
router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).json({error: 'The post with the specified ID does not exist.'})
    } else {
        db.findPostComments(id)
            .then(comments => {
                res.status(200).json(comments);
            })
            .catch(error => {
                res.status(500).json({error: 'The comments information could not be retrieved'})
            })
    }
})

// POST /api/posts Creates a post using the information sent inside the `request body`.
    
router.post('/', (req, res) => {
    const content = req.body;
    if (!content.title || !content.contents) {
        res.status(400).json({error: 'Please provide title and contents for post'})
    } else {
        db.insert(content)
            .then(post => {
                res.status(201).json(content);
            })
            .catch(error => {
                res.status(500).json({error: 'Error retrieving posts'})
            })
    }
})

// POST /api/posts/:id/comments Creates a comment for the post with the specified id using information sent inside of the `request body`.  
    
router.post('/:id/comments', (req, res) => {
    db.insertComment()
        .then()
        .catch(error => {
            res.status(500).json({error: 'Error retrieving posts'})
        })
})

// DELETE /api/posts/:id  Removes the post with the specified id and returns the **deleted post object**. You may need to make additional 
// calls to the database in order to satisfy this requirement. 

router.delete('/:id', (req, res) => {
    db.remove()
        .then()
        .catch(error => {
            res.status(500).json({error: 'The post could not be removed'})
        })
})

// PUT /api/posts/:id  Updates the post with the specified `id` using data from the `request body`. Returns the modified document, 

router.put('/:id', (req, res) => {
    db.update()
        .then()
        .catch(error => {
            res.status(500).json({error: 'The post information could not be modified'})
        })
})

module.exports = router;