import React from 'react';

const RepoList = (props) => (
  <div id='RepoList'>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos by stargazers.
  </div>
)

export default RepoList;