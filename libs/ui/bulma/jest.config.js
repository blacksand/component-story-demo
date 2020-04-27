module.exports = {
  name: 'ui-bulma',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ui/bulma',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
