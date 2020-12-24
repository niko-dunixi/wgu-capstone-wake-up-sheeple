import React from 'react';
import { AppBar, Container, TextField, Toolbar, Typography, Paper, Box, Grid, Button, Link , Table, TableContainer, TableHead, TableRow, TableCell} from '@material-ui/core';

function App() {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Grid container justify='space-between'>
            <Grid item>
              <Typography variant='h4'>Wake Up Sheeple!</Typography>
            </Grid>
            <Grid item>
              <Typography variant='h5'>A WGU Capstone Project</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container maxWidth='lg'>
        <Box m={3} p={4}>
          {/* <Paper elevation={3}> */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <p>
                  They walk amongst us. They want to rule us. The lizard-people are in the US Government.
                </p>
                <p>
                  <Link href='https://web.archive.org/web/20021010174545/http://www.thewatcherfiles.com/exposing_reptilians.htm' target='_blank'>In 2002</Link>, <Link href='http://www.thewatcherfiles.com/exposing_reptilians.htm' target='_blank'>a brave and very credible website</Link> leaked a list of known agents in the 107th congress. We can use this list and couple it with machine learning techniques to determine based on voting patterns who is and isn't a malicious actor.
                </p>
                <p>
                  At a high level, the algorithm is as follows:
                  <ol>
                    <li>Aggregate legislation from all congresses and classify it</li>
                    <ul>
                      <li>This requires visiting <Link href='senate.gov' target='_blank'>senate.gov</Link> for a catalog of legislation, and then visiting <Link href='congress.gov' target='_blank'>congress.gov</Link> for the actual text contents of legislation</li>
                      <li>We take a random 20% selection of this data and use it to build our categorization k-means classifier. We don't use only legislation from the 107th congress, because that will not give us a broad enough classifier for all legislation that happens in the other congress sessions.</li>
                    </ul>
                  </ol>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Classification Step</TableCell>
                          <TableCell>Description</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableRow>
                        <TableCell>tfidf_vectorizer</TableCell>
                        <TableCell>We take the words, and eliminate words that appear in at least 15% of the documents but not more than 80% of the documents. This allows us to get relevant words that are general enough to appear in the majority of documents while also eliminating those that are too common (eg: "the", "congress", "US Government", etc) and eliminate those that appear very frequently in too-specific subsets of legislation (for instance, if a single document uses the word "Ballet" more frequently than any other word, we wouldn't want to consider this a category because it is too specific and should be considered an outlier. We wouldn't be able to create a category for any other legislation with this word.).</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>truncated_svd</TableCell>
                        <TableCell>This takes our vectorized bag-of-words and turns it into a function that scikit-learn can use efficiently</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>normalizer</TableCell>
                        <TableCell>This, very literally, normalizes the function. This allows us to work efficiently with various ranges of data. This is especially important <i>after</i> training has taken place during classification.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>kmeans_clustering</TableCell>
                        <TableCell>We can now actually take the normalized/vectorized/bag-of-words that we have built up and use this to create our clustered that we use to categorize future data.</TableCell>
                      </TableRow>
                    </Table>
                  </TableContainer>
                  
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField id='outlined-basic' label='API Key' variant='outlined' />
                <Button>
                  asdf
                </Button>
              </Grid>
            </Grid>
          {/* </Paper> */}
        </Box>
      </Container>
    </div>
  );
}

export default App;
