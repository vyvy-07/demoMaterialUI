import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Box } from '@mui/material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import Link from 'next/link';
const TreeView = () => {
  return (
    <Box>
      <SimpleTreeView className="flex justify-center flex-col items-center">
        <Link href="erer12324">
          <TreeItem
            itemId="pickers454"
            label={
              <>
                <AccountBalanceIcon style={{ marginRight: '8px' }} />
                <p className="label"> Time Pickers</p>
              </>
            }
          />
        </Link>
        <TreeItem
          itemId="pickers"
          label={
            <>
              <AccountBalanceIcon style={{ marginRight: '8px' }} />
              <p className="label"> Date ickers</p>
            </>
          }
        >
          <TreeItem
            className="treeItem"
            itemId="pickers-community23"
            label="@mui/x-date-pickers"
          />
        </TreeItem>
        <TreeItem
          itemId="pickers2"
          label={
            <>
              <AccountBalanceIcon style={{ marginRight: '8px' }} />
              <p className="label"> Time Pickers</p>
            </>
          }
        >
          <TreeItem
            className="treeItem"
            itemId="pickers-pro22"
            label={<p>123123</p>}
          />{' '}
          <TreeItem
            className="treeItem"
            itemId="pickers-pro21"
            label={<p>123123</p>}
          />
        </TreeItem>
      </SimpleTreeView>
    </Box>
  );
};

export default TreeView;
