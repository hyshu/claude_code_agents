#!/usr/bin/env tsx
import { YAMLParser } from './parser';
import { Executor } from './executor';
import { formatError } from '../../../utils/common';
import * as path from 'path';
import * as fs from 'fs';

async function main() {
  console.log('🤖 Claude Code YAML Agent Runner v0.0.1');
  console.log('========================\n');

  // Get YAML file path from command line arguments
  const args = process.argv.slice(2);

  const yamlPath = args.length === 0 ? 'agent.yaml' : args[0];
  const absolutePath = path.isAbsolute(yamlPath) ? yamlPath : path.join(process.cwd(), yamlPath);

  try {
    // Parse YAML file
    console.log(`📄 Loading YAML file: ${yamlPath}`);
    const parser = new YAMLParser();
    const config = await parser.loadYAML(absolutePath);

    // Execute the configuration
    const executor = new Executor();
    await executor.execute(config);

    console.log('\n🎉 All tasks completed successfully!');
  } catch (error) {
    if (args.length === 0) {
      showUsage();
    } else {
      console.error('\n❌ Fatal error:', formatError(error));
    }
    process.exit(1);
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', formatError(reason));
  process.exit(1);
});

// Run main function
main().catch((error) => {
  console.error('❌ Uncaught error:', error);
  process.exit(1);
});

function showUsage() {
  console.log('📋 How to use:');
  console.log('  npm start # Uses agent.yaml (default)');
  console.log('  npm start [YAML file]');
}
