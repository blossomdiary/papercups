import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Flex} from 'theme-ui';
import {colors, Text} from '../common';
import {CheckOutlined} from '../icons';
import {BRAND_COLOR} from '../../config';

const ConversationClosing = ({isHighlighted}: {isHighlighted?: boolean}) => {
  return (
    <Box
      p={3}
      sx={{
        opacity: 0.8,
        borderBottom: '1px solid #f0f0f0',
        borderLeft: isHighlighted ? `2px solid ${colors.primary}` : null,
        background: isHighlighted ? `${BRAND_COLOR}10` : null,
        cursor: 'pointer',
      }}
    >
      <Flex mb={2} sx={{justifyContent: 'space-between'}}>
        <Flex sx={{alignItems: 'center'}}>
          <Box mr={2}>
            <CheckOutlined style={{fontSize: 16, color: colors.green}} />
          </Box>
          <Text strong>Conversation closed!</Text>
        </Flex>
      </Flex>
      <Box
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <Text type="secondary">
          Reopen it <Link to="/conversations/closed">here</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default ConversationClosing;
